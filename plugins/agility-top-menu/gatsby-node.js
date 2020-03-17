exports.sourceNodes = async (args, configOptions) => {
	const { actions, createNodeId, createContentDigest, getNode, getNodes, store, cache, reporter } = args;
	const { createNode, deleteNode, deletePage, touchNode } = actions


	// getNodes()

	// const getNodeID = ({ itemType, languageCode, itemID }) => {
	// 	const preStr = `agility${languageCode}-${itemType}-${itemID}`.toLowerCase();
	// 	return createNodeId(preStr);
	// }

	// const nodeID = getNodeID({ itemType: "nestedsitemap", languageCode: "en-ca", itemID: "website" });

	console.log("IN SITEMAP PLUGIN")


}