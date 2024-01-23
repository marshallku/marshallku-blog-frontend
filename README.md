# Blog Frontend

PoC of porting blog - my **BIGGEST** technical debt.

## Todo

1. Switch Front-end application to Next.js(currently using vanilla JS)
    - Use markdown instead database
    - Port vanilla js components to React
    - Test web applications that built with JavaScript inside of post
2. Implement user api, and setup image server (currently using PHP)
3. Migrate post data to Markdown, and upload images to image server
    - Test redirection to static pages with Nginx
    - Check 301 redirection(e.g. `/web/tips/*` -> `/dev/*`)
4. Implement comment api, and filtering system
5. Migrate all database and files
