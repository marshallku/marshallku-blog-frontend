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

# select a package in apps, packages
target=$(find apps/ packages/ -mindepth 1 -maxdepth 1 -type d | fzf)
package_name=$(grep '"name"' "${target}/package.json" | awk -F ': ' '{print $2}' | tr -d '",')

cd "$target" || exit 1

packages=$(pnpm outdated)
IFS=$'\n'
mapfile -t lines <<<"$packages"
regex="│ ([a-zA-Z0-9\._@\/-]+)(.*)? │ +([0-9\.]+) (\(wanted +([0-9\.]+)\))? +│ +([0-9\.]+) +│"

cmd='pnpm i '

for ((i = 0; i < ${#lines[@]}; i++)); do
    line=${lines[$i]}

    if [[ $line =~ $regex ]]; then
        package="${BASH_REMATCH[1]}"
        current_version="${BASH_REMATCH[3]}"
        update_version="${BASH_REMATCH[6]}"

        confirm "Will you update $package from $current_version to $update_version?" && cmd+="$package@$update_version "

    fi
done

if [[ "$cmd" == 'pnpm i ' ]]; then
    echo 'Packages are up to date, installation step is skipped'
    exit 0
fi

cd ../..

eval "$cmd --filter $package_name"

if confirm "Commit changes?"; then
    git add package.json pnpm-lock.yaml
    git commit -m 'Update packages'
fi
