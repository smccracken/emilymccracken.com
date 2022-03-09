module.exports = config => {
    config.addPassthroughCopy('./src/images/');

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        passthroughFileCopy: true
    };
}