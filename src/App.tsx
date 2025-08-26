import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Profile } from "@liff/get-profile";
import axios from "axios";
import Home from "./tabs/Home";
import { HiBell, HiHome, HiUpload } from "react-icons/hi";
import Activity from "./tabs/Activity";
import Connected from "./tabs/Connected";
import Noti from "./tabs/Noti";

export type LiffData = {
	dt_lastlogin: string;
	firstname_EN: string;
	firstname_TH: string;
	itaccounttype_TH: string;
	lastname_EN: string;
	lastname_TH: string;
	organization_name_EN: string;
	organization_name_TH: string;
	profile: string;
	role: string;
	student_id: string;
	year: string;
	image: string;
	_id: string;
	point: number;
}

function App() {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [profile, setProfile] = useState<Profile | null>(null);
	const [liffData, setLiffData] = useState<LiffData | null>(null);
	const [connetCMU, setConnetCMU] = useState(false);
	const [tab, setTab] = useState("");
	const [loading, setLoading] = useState(true);

	function updateQueryParam(key: string, value: string) {
		if (!key || !value) return;
		const url = new URL(window.location.toString());
		url.searchParams.set(key, value);
		window.history.replaceState({}, '', url);
	}

	useEffect(() => {
		updateQueryParam("tab", tab);
	}, [tab])

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const tabParam = urlParams.get("tab");
		if (tabParam) {
			setTab(tabParam);
		} else {
			setTab("home");
		}
	}, [])

	const renderPage = (tab: string) => {
		switch (tab) {
			case "home": return (<Home connectCMU={connetCMU} profile={profile} liffData={liffData} />);
			case 'connected': return (<Connected setTab={setTab} liffData={liffData} profile={profile} connectCMU={connetCMU} />);
			case "noti": return (<Noti setTab={setTab} profile={profile} />);
			case "activity": return (<Activity setTab={setTab} profile={profile} liffData={liffData} />);
		}
	}

	const fetchLiftData = async (userId: string) => {
		const response = await axios.get(import.meta.env.VITE_ENDPOINT + "/liffProfile/" + userId);
		if (!response.data.result) { setConnetCMU(false); return; }
		setLiffData(response.data.result);
		setConnetCMU(true);
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
					localStorage.setItem("lineId", profile.userId);
					localStorage.setItem("lineImage", profile.pictureUrl ?? "");
					setProfile(profile);
					setMessage(`Hello, ${name}!`);
				})
				.catch((err) => {
					console.log("error", err);
				}).finally(() => {
					setLoading(false);
				})
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
			}).catch(() => {
				setLoading(false);
			})
	}, []);

	const query = new URLSearchParams(window.location.search);

	const fetchEntra = async (code: string, lineId: string, imageUrl: string) => {
		const response = await axios.get(import.meta.env.VITE_ENDPOINT + "/auth/entra_login?code=" + code + "&state=" + lineId + "&image=" + imageUrl);
		console.log("Response from Entra:", response.data);
		if (response.data.status) {
			window.location.href = "?tab=connected";
			// updateQueryParam("code", "");
			// setTab("connected");
		} else {
			alert("เชื่อมต่อไม่สำเร็จ");
		}

	}

	const [onGoing, setOngoing] = useState(false);
	useEffect(() => {

		const code = query.get("code")
		const liffRedirectUri = query.get("liffRedirectUri")
		const lineId = localStorage.getItem("lineId");
		const image = localStorage.getItem("lineImage") ?? "";
		if (code && lineId && !onGoing && !liffRedirectUri) {
			setOngoing(true);
			fetchEntra(code, lineId, image);
		}


	}, [query])


	if (loading || !profile) {
		return (
			<div className="w-screen h-screen flex flex-col justify-center items-center bg-[#E8E8E8]">
				<span className="loader"></span>
				<span className="text-black text-lg">
					กำลังโหลดข้อมูล...</span>
			</div>
		);
	}

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
