#!/bin/bash

base_path='apps/blog/_posts'

category=$(find $base_path -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | fzf)

echo 'Enter the title:'
read -r title_input
title=$(echo "$title_input" | tr ' ' '-')

echo "$category $title"

echo "---
title: 
description: 
date:
coverImage: 
ogImage: 
---" >>"$base_path/$category/$title.mdx"
