#!/bin/bash

directory='components'
story_dir='apps/docs/stories'

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

component_dir="apps/blog/src/$directory/$component_name"

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

# Create story file
echo "import { type Meta, type StoryObj } from \"@storybook/react\";
import $component_name, { type ${component_name}Props } from \"@blog/$component_name\";

const story: Meta<${component_name}Props> = {
    component: $component_name,
    title: \"Components/$component_name\",
    parameters: {
        docs: {
            description: {
                component: \"ADD_YOUR_DESCRIPTION\",
            },
        },
    },
};

export default story;

export const Default: StoryObj<${component_name}Props> = {
    args: {},
};" >>"$story_dir/$component_name.stories.tsx"
