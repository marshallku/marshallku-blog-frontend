#!/bin/bash
confirm() {
    while true; do
        read -r -n 1 -p "${1:-Continue?} [y/n]: " REPLY
        case $REPLY in
        [yY])
            echo
            return 0
            ;;
        [nN])
            echo
            return 1
            ;;
        *) printf " \033[31m %s \n\033[0m" "invalid input" ;;
        esac
    done
}

workspace=false

parse_args() {
    case "$1" in
    -w | --workspace)
        workspace=true
        ;;
    esac
}

while [[ "$#" -ge 1 ]]; do
    parse_args "$1"
    shift 1
done

# select a package in apps, packages
if [ "$workspace" = true ]; then
    target=''
else
    target=$(find apps/ packages/ -mindepth 1 -maxdepth 1 -type d | fzf)
fi

if [ "$workspace" = false ] && [ -z "$target" ]; then
    echo 'No target selected'
    exit 0
fi

if [ "$workspace" = true ]; then
    package_file='package.json'
else
    package_file="${target}/package.json"
fi

package_name=$(grep '"name"' "${package_file}" | awk -F ': ' '{print $2}' | tr -d '",')

if [ -n "$target" ]; then
    cd "$target" || exit 1
fi

packages=$(pnpm outdated 2>&1)
IFS=$'\n'
mapfile -t lines <<<"$packages"
regex="│ ([a-zA-Z0-9\._@\/-]+)(.*)? │ +([0-9\.]+) (\(wanted +([0-9\.]+)\))? +│ +([0-9\.]+) +│"

if [ "$workspace" = true ]; then
    default_cmd='pnpm i -w '
else
    default_cmd='pnpm i '
fi

cmd="$default_cmd"

for ((i = 0; i < ${#lines[@]}; i++)); do
    line=${lines[$i]}

    if [[ $line =~ $regex ]]; then
        package="${BASH_REMATCH[1]}"
        current_version="${BASH_REMATCH[3]}"
        update_version="${BASH_REMATCH[6]}"

        confirm "Will you update $package from $current_version to $update_version?" && cmd+="$package@$update_version "

    fi
done

if [[ "$cmd" == "$default_cmd" ]]; then
    echo 'Packages are up to date, installation step is skipped'
    exit 0
fi

cd ../..

eval "$cmd --filter $package_name"

if confirm "Commit changes?"; then
    git add package.json pnpm-lock.yaml
    git commit -m 'Update packages'
fi
