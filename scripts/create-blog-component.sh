#!/bin/bash

directory='components'

while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
    -t | --template)
        directory='templates'
        shift
        ;;
    -l | --layout)
        directory='layouts'
        shift
        ;;
    *)
        echo "Unknown option: $key"
        exit 1
        ;;
    esac
done

read -rp 'Name of the component: ' name

if [ -z "$name" ]; then
    echo 'Component name is required'
    exit 1
fi

component_name=$(tr '[:lower:]' '[:upper:]' <<<"${name:0:1}")${name:1}
style_name=$(echo "$component_name" | perl -pe 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')

component_dir="apps/blog/src/$directory/$name"

mkdir -p "$component_dir"

# Create style file
printf ".%s {\n\n}" "$style_name" >"$component_dir"/index.module.scss

# Create component file
echo "import { classNames } from '@marshallku/utils';
import styles from './index.module.scss';

export interface ${component_name}Props {}

const cx = classNames(styles, '$style_name');

function $component_name({}: ${component_name}Props) {
    return <div className={cx()}></div>;
}

export default $component_name" >>"$component_dir"/index.tsx

# Update barrel file
echo "export { default as $component_name, type ${component_name}Props } from './$name';" >>apps/blog/src/$directory/index.ts
