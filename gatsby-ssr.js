export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	if (process.env.NODE_ENV !== 'production')
		return

	const headComponents = getHeadComponents()

	//re-order the head components so that the <Style>
	headComponents.sort((x, y) => {

		const xType = x.type;
		const yType = y.type;
		const xAttr = x.props["data-href"];
		const yAttr = y.props["data-href"];

		if (xType === "style" && xAttr) {
			return 1
		} else if (yType === "style" && yAttr) {
			return -1
		}
		return 0
	})
	replaceHeadComponents(headComponents)


}