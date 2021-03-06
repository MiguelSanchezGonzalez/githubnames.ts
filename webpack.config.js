
const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {

    entry: path.resolve( __dirname, 'src/index.ts' ),

    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    },

    module: {

        rules: [
            {
                test: /\.ts$/,
                use: [ 'awesome-typescript-loader' ]
            }
        ]
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.resolve( __dirname, 'output' )
    },

    output: {
        path: path.resolve( __dirname, 'output' ),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin( {
            template: 'src/index.html'
        } )
    ]

};
