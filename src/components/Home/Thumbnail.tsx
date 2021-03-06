import styled, { keyframes } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { IPhotos } from '../../data/IProject'
import { LoadingColor, PrimaryColor, PrimaryColorBg } from '../../GlobalStyles'

interface IThumbnailProps {
	index: number
	title: string
	photo: IPhotos
}

export const Thumbnail = (props: IThumbnailProps): JSX.Element => {
	const { photo, title, index } = props
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<Container>
			<StyledLink
				ref={ref}
				to={{
					pathname: `page/${title.replace(' ', '').toLowerCase()}`,
					state: {
						index: index,
					},
				}}
			>
				{inView && (
					<>
						<Image
							srcSet={`
						${process.env.REACT_APP_THUMBNAIL_1x}${photo.img} 1x,
						${process.env.REACT_APP_THUMBNAIL_15x}${photo.img} 1.5x,
						${process.env.REACT_APP_THUMBNAIL_2x}${photo.img} 2x,
					`}
							src={process.env.REACT_APP_THUMBNAIL_1x + photo.img}
						/>
						<Hover />
					</>
				)}
			</StyledLink>
		</Container>
	)
}

const BORDER_WIDTH = 2

export const AnimateIn = keyframes`
	from { opacity: 0;}
	to { opacity: 1; }
`
const Container = styled.li`
	margin-right: 10px;
`

const Hover = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity 0.25s ease-out;
`

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	z-index: 1;
	height: 250px;
	width: 350px;
	background-color: ${LoadingColor};
	transition: width 0.5s ease-in, height 0.5s ease-in;

	&:focus {
		${Hover} {
			opacity: 1;
			border: ${BORDER_WIDTH}px solid ${PrimaryColor};
			box-shadow: inset 0px 0px 0px 5px ${PrimaryColorBg};
		}
	}

	&:focus:not(:focus-visible) {
		${Hover} {
			opacity: 0;
		}
	}

	@media only screen and (max-width: 450px) {
		height: 200px;
		width: 275px;
	}
`

const Image = styled.img`
	flex-shrink: 0;
	min-width: 100%;
	min-height: 100%;
	opacity: 0;
	animation: 1s ease-out 0.5ms ${AnimateIn};
	animation-fill-mode: forwards;
`
