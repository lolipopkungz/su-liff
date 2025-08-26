import { Flex } from "@radix-ui/themes";
import { HiBell, HiChevronLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { LiffData } from "../App";
import { Profile } from "@liff/get-profile";

type Props = {
	setTab: (tab: string) => void;
	profile: Profile | null;
	liffData: LiffData | null;
}

function Noti({ setTab, liffData }: Props) {
	const [cam, setCam] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const [onGoing, setOnGoing] = useState(false);
	useEffect(() => {
		console.log(liffData);
		if (!liffData && !onGoing) {
			setOnGoing(true);
			// alert("กรุณาเชื่อมต่อบัญชีก่อนทำกิจกรรม")
			// window.location.href = '/';
		}

	}, [])

	const [notifications, setNotifications] = useState([])
	const fetchData = async () => {

		const res = await axios.get(import.meta.env.VITE_ENDPOINT + '/notification', {
			headers: {
				'x-line': localStorage.getItem('lineId') || ''
			}
		})
		if (res.data.status) {
			setNotifications(res.data.results)
		}
	}
	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>

			<div className="flex gap-3 p-4 place-items-center bg-[#373A71]" onClick={() => setTab('home')} >
				<HiChevronLeft className="text-2xl text-white cursor-pointer" />
				<span className="text-white">การแจ้งเตือน</span>

			</div>

			<div className="mx-2 mt-4">
				<Flex direction="column" gap="3">

					{notifications && notifications.length > 0
						? notifications.map((noti: any, idx) => {
							const match = noti.title.match(/(\d+)\s*คะแนน/);
							const points = match ? match[1] : "0";
							const parts = noti.title.split(/(\d+\s*คะแนน)/);

							return (
								<div
									key={idx}
									className="bg-blue-500/30 p-4 rounded-lg flex gap-4 items-center"
								>
									<HiBell className="text-5xl text-blue-700" />
									<span className="text-blue-700">
										{parts.map((part: any, i) =>
											/(\d+\s*คะแนน)/.test(part) ? (
												<strong key={i} className="text-blue-800">
													{part}
												</strong>
											) : (
												<span key={i}>{part}</span>
											)
										)}
									</span>
								</div>
							);
						})
						: null}


				</Flex>

			</div>


		</>
	)
}

export default Noti; 
