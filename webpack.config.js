const path = require('path');

module.exports = ({ development }) => ({
    entry: './src/timer.ts',
    devtool: development ? 'inline-source-map' : false,
    mode: development ? 'development' : 'production',
    output: {
        filename: 'timer.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name : "Timer",
            type : 'var',
            export : 'default'
        },
        umdNamedDefine: true,
        globalObject: 'typeof self === \'undefined\' ? this : self',
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    }
});