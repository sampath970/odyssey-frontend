import localFont from "next/font/local"
const OdysseyFonts = localFont(
    {
        src: [
            {
                path: './public/assets/fonts/inter-med.woff2',
                weight: '300',
                style: 'normal',
            },
            {
                path: './public/assets/fonts/inter-italic.woff2',
                weight: '400',
                style: 'italic',
            },
            {
                path: './public/assets/fonts/inter-semibold.woff2',
                weight: '700',
                style: 'bold',
            },
            {
                path: './public/assets/fonts/inter-roman.woff2',
                weight: '700',
                style: 'normal',
            },
            {
                path:'./public/assets/fonts/inter-light.ttf',
                weight: '200',
                style: 'lighter',
            },
            {
                path:'./public/assets/fonts/inter-thin.ttf',
                weight: '100',
                style: 'lighter',
            }
        ]
    }
)

export default OdysseyFonts;