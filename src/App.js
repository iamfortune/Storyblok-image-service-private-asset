import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
	accessToken: "5BtK7LI8vieGBr4TMQxDNwtt",
	cache: {
		clear: "auto",
		type: "memory",
	},
});

const privateAsset =
	"https://a.storyblok.com/f/143584/504x295/35d4fa30b1/screenshot-from-2022-01-20-17-05-55.png";
	// "https://a.storyblok.com/f/143584/504x295/35d4fa30b1/screenshot-from-2022-01-20-17-05-55.png";

const App = () => {
	const [signedUrl, setSignedUrl] = useState("");

	useEffect(() => {
		const fetchSpace = async (fileURL) => {
			try {
				const res = await Storyblok.get("cdn/assets/me", {
					filename: privateAsset,
				});

				console.log(res);

				setSignedUrl(
					`http://private-img.storyblok.com/${res?.data?.asset?.signed_url}/m/500x500/filters:grayScale()`
				);
			} catch (error) {
				console.log(error);
			}
		};

	

		fetchSpace();
	}, []);


	return (
		<div>
			<h2 style={{ textAlign: "center" }}>Image Services on Private Asset</h2>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{signedUrl && (
					<div>
						<img src={signedUrl} alt="Storyblok Private Asset" />
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
