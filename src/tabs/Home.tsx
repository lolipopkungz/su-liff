import { Button } from "@radix-ui/themes";
import { Profile } from "@liff/get-profile";
import CrownIcon from "../components/CrownIcon";
import { LiffData } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiGift, HiOutlineTicket } from "react-icons/hi";

type Props = {
	connectCMU: boolean;
	profile: Profile | null;
	liffData: LiffData | null;
}

function Home({ connectCMU, profile, liffData }: Props) {
	const handleConnectCMUSU = () => {
		// window.open(`https://cmusu.com/liff?lineId=${profile.userId}`);
		if (!profile) {
			return;
		}

		const scope = `api://cmu/Mis.Account.Read.Me.Basicinfo offline_access`
		const client_id = `b729125d-51bb-46c1-833c-51370957aa94`
		const redirect_uri = `https://cmusu.com/callback/cmu`

		window.location.href =
			`https://login.microsoftonline.com/cf81f1df-de59-4c29-91da-a2dfd04aa751/oauth2/v2.0/authorize` +
			`?client_id=${encodeURIComponent(client_id)}` +
			`&response_type=code` +
			`&redirect_uri=${encodeURIComponent(redirect_uri)}` +
			`&scope=${encodeURIComponent(scope)}`;
		// window.location.href = `http://localhost:3000/liff?lineId=${profile.userId}`;
	}



	const [leader, setLeader] = useState([])
	const fetchLeadaer = async () => {
		try {
			const res = await axios.get(import.meta.env.VITE_ENDPOINT + '/leaderboard')
			if (res.data.status) {
				setLeader(res.data.results)
			}
		} catch (e) {

		}

	}
	useEffect(() => {
		fetchLeadaer();
	}, [])

	const getLeadColor = (rank: number) => {
		if (rank === 1) return "gold";
		if (rank === 2) return "silver";
		if (rank === 3) return "bronze";
		return "none";
	}
	return (
		<>
			<div className="bg-white -mt-5 rounded-[20px] shadow-md p-4 pb-6">


				<HiGift className="text-[150px] fixed top-3 right-2 rotate-45 text-white/5" />

				<div className="rounded-full overflow-hidden w-[100px] h-[100px] mb-4 absolute top-[-90px] left-[20px] border-[4px] border-white bg-white">
					<img src={connectCMU && liffData ? liffData.image : "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"} alt="" />
				</div>
				<div className="mt-5">
					<span className="text-md font-bold">สวัสดี' {liffData ? liffData.firstname_TH + " " + liffData.lastname_TH : ''}</span>

					{!connectCMU ?

						<div className="border-[#e5484db3] border bg-red-500/10 w-full flex flex-col p-4 rounded-[15px] text-red-600 mt-2 relative">
							<span>คุณยังไม่ได้เชื่อมต่อ CMU Account</span>
							<Button className="mt-2" color="red" size={"3"} onClick={handleConnectCMUSU}>
								เชื่อมต่อ
							</Button>
						</div>
						:
						<div className="bg-gradient-to-r from-[#5C5AA3] to-[#3e3c85] w-full flex flex-col p-4 rounded-[15px] text-white mt-2 relative">
							<span>คะแนนของคุณ</span>
							<span className="text-3xl font-bold mb-2">{liffData ? liffData.point : 0}</span>
							<div className="h-full w-[2px] border-l-2 border-dashed border-white/20 absolute top-0 right-[100px]"></div>
						</div>
					}
				</div>

			</div >


			<div className="mx-4 mt-2">

				<span className="text-lg font-bold">
					ตารางอันดับ
				</span>

				<div className="bg-white">
					<div className="max-w-md mx-auto bg-white rounded-xl shadow p-2">
						<ul>
							{leader.map((item: any, idx) => {
								const rank = idx + 1
								return (
									<li
										key={idx}
										className="flex items-center py-3 border-b last:border-b-0"
									>
										<div className="flex items-center w-12 justify-center font-bold text-lg">
											{rank <= 3 ? (
												<CrownIcon type={getLeadColor(idx + 1) as any} />
											) : null}
											<span
												className={`${rank === 1
													? "text-[#D8A137]"
													: rank === 2
														? "text-[#B0B0B0]"
														: rank === 3
															? "text-[#CE9152]"
															: "text-black"
													}`}
											>
												{rank}
											</span>
										</div>
										<img
											src={item.image ? item.image : "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"}
											alt={item.firstname_TH}
											className="w-12 h-12 rounded-full object-cover mx-3"
										/>
										<div className="flex-1">
											<div className="font-semibold">{item.firstname_TH}</div>
											<div className="text-sm text-gray-500">{item.organization_name_TH}</div>
										</div>
										<div className="font-semibold text-right text-lg w-16">
											{item.point.toLocaleString()}
										</div>
									</li>
								)
							}

							)
							}
						</ul>
					</div>

				</div>
			</div>


		</>
	)
}

export default Home
