import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Profile } from "@liff/get-profile";
import axios from "axios";
import Home from "./tabs/Home";
import { HiBell, HiHome, HiUpload } from "react-icons/hi";
import Activity from "./tabs/Activity";


function App() {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [profile, setProfile] = useState<Profile | null>(null);
	const [connetCMU, setConnetCMU] = useState(false);
	const [tab, setTab] = useState("home");

	const renderPage = (tab: string) => {
		switch (tab) {
			case "home": return (<Home connectCMU={connetCMU} />);
			case "activity": return (<Activity setTab={setTab} />);
		}
	}

	const fetchLiftData = async (userId) => {
		const response = await axios.get("http://localhost:5000/liffProfile/" + userId);
		if (!response.data.result) { setConnetCMU(false); return; }
		console.log("Response from server:", response.data);

	}


	const fetchLineProfile = async () => {
		if (!liff.isLoggedIn()) {
			liff.login();
		} else {


			const accessToken = liff.getAccessToken();
			console.log("Access Token:", accessToken);
			liff
				.getProfile()
				.then((profile) => {
					const name = profile.displayName;
					console.log(profile);
					fetchLiftData(profile.userId);
					setProfile(profile);
					setMessage(`Hello, ${name}!`);
				})
				.catch((err) => {
					console.log("error", err);
				});
		}
	}

	useEffect(() => {
		liff
			.init({
				liffId: import.meta.env.VITE_LIFF_ID
			})
			.then(() => {
				setMessage("LIFF init succeeded.");
				fetchLineProfile()


			})
			.catch((e: Error) => {
				setMessage("LIFF init failed.");
				setError(`${JSON.stringify(e)}`);
			});
	}, []);


	return (
		<div className={`bg-[#E8E8E8]  w-[100vw] fixed bottom-0`} style={{ height: tab == "home" ? "85vh" : "100vh" }}>
			{renderPage(tab)}


			<div className="bg-white flex justify-between items-center p-4 py-2.5 fixed bottom-0 w-full">
				<div className={`nav ${tab == "home" ? "active" : ""}`} onClick={() => setTab("home")}>
					<HiHome className="text-2xl" />
					<span>หน้าแรก</span>
				</div>

				<div className={`nav ${tab == "activity" ? "active" : ""}`} onClick={() => setTab("activity")}>
					<HiUpload className="text-2xl" />
					<span>ส่งกิจกรรม</span>
				</div>

				<div className={`nav ${tab == "noti" ? "active" : ""}`} onClick={() => setTab("noti")}>
					<HiBell className="text-2xl" />
					<span>การแจ้งเตือน</span>
				</div>

			</div>
		</div>
	);
}

export default App;
