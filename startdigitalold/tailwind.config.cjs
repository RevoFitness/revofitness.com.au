module.exports = {
	content: ['./*/*.php', './*.php', './templates/**/*.twig', './*/*/.js'],
	theme: {
		container: false,
		extend: {
			animation: {
				infiniteScroll: 'infiniteScroll 20s linear infinite',
				infiniteScroll2: 'infiniteScroll2 20s linear infinite',
			},
			aspectRatio: {
				'16/9': '16/9',
				'3/2': '3/2',
				'4/3': '4/3',
				'3/4': '3/4',
				'5/7': '5/7',
				'1/1': '1/1',
			},
			borderRadius: {
				lg: '10px',
			},
			colors: {
				pureWhite: '#FFFFFF',
				white: '#FFFDF9',
				black: '#333132',
				brandRed: '#DD2B32',
				brandRedDark: '#AD212D',
				brandPink: '#F392BD',
				brandBlack: '#333132',
				brandGreyLight: '#F4F3F4',
				brandGrey: '#C1BFBF',
				brandYellow: '#FED133',
				greyBackground: '#F5F5F5',
				lightPink: '#FBEEE7',
				brandCream: '#FCF9F1',
				brandEucalyptus: '#8BC6C1',
			},
			fontFamily: {
				primary: ['greycliff-cf', 'sans-serif'],
				secondary: ['greycliff-cf', 'sans-serif'],
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1080px',
				xl: '1280px',
				'2xl': '1690px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
