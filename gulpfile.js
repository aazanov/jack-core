const gulp =        require("gulp");
const fs   =        require('fs');
const ts =          require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ['build', 'mkdir']);

gulp.task("build", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build"));
});

gulp.task("mkdir", () => {
    const folders = [
        'public',
        'public/img'
    ];

    folders.forEach(dir => {
        if(!fs.existsSync(dir))
            fs.mkdirSync(dir),
                console.log('📁  folder created:', dir);
    });
});