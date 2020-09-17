const {
    FALSE
} = require("node-sass");

module.exports = {
    productionSourceMap: false,
    devServer: {
        host: "localhost",
        port: 8080,
        // proxy: "http://mall-pre.springboot.cn"
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                },

            }
        }
        // proxy: {
        //     '/products': {
        //         target: 'http://mall-pre.springboot.cn/products',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '/products': ''
        //         },
        //     },
        //     //     '/user': {
        //     //         target: 'http://mall-pre.springboot.cn/user',
        //     //         changeOrigin: true,
        //     //         pathRewrite: {
        //     //             '/user': ''
        //     //         }
        //     //     },
        //     // '/carts/products': {
        //     //     target: 'http://mall-pre.springboot.cn/',
        //     //     // target: 'http://baidu.com',
        //     //     changeOrigin: true,
        //     //     // pathRewrite: {
        //     //     //     '/carts/products': ''
        //     //     // }
        //     // },
        //     //     '/user/login': {
        //     //         target: 'http://mall-pre.springboot.cn/user/login',
        //     //         changeOrigin: true,
        //     //         pathRewrite: {
        //     //             '/user/login': ''
        //     //         }
        //     //     },
        //     // '/carts': {
        //     //     target: 'http://mall-pre.springboot.cn/carts',
        //     //     changeOrigin: true,
        //     //     pathRewrite: {
        //     //         '/carts': ''
        //     //     }
        //     // }
        // }
    },
    productionSourceMap: false
}