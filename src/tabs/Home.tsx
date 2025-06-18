import { Button } from "@radix-ui/themes";

type Props = {
	connectCMU: boolean;
}

function Home({ connectCMU }: Props) {



	const CrownIcon = ({ type }: { type: "gold" | "silver" | "bronze" }) => {
		if (type === "gold")
			return (
				<span className="mr-2">
					<svg width="20" height="20" viewBox="0 0 16 16" fill="none">
						<path d="M2 6l3 6 3-6 3 6 3-6" stroke="#D8A137" strokeWidth="2" fill="none" />
						<circle cx="2" cy="6" r="1" fill="#D8A137" />
						<circle cx="8" cy="6" r="1" fill="#D8A137" />
						<circle cx="14" cy="6" r="1" fill="#D8A137" />
					</svg>
				</span>
			);
		if (type === "silver")
			return (
				<span className="mr-2">
					<svg width="20" height="20" viewBox="0 0 16 16" fill="none">
						<path d="M2 6l3 6 3-6 3 6 3-6" stroke="#B0B0B0" strokeWidth="2" fill="none" />
						<circle cx="2" cy="6" r="1" fill="#B0B0B0" />
						<circle cx="8" cy="6" r="1" fill="#B0B0B0" />
						<circle cx="14" cy="6" r="1" fill="#B0B0B0" />
					</svg>
				</span>
			);
		if (type === "bronze")
			return (
				<span className="mr-2">
					<svg width="20" height="20" viewBox="0 0 16 16" fill="none">
						<path d="M2 6l3 6 3-6 3 6 3-6" stroke="#CE9152" strokeWidth="2" fill="none" />
						<circle cx="2" cy="6" r="1" fill="#CE9152" />
						<circle cx="8" cy="6" r="1" fill="#CE9152" />
						<circle cx="14" cy="6" r="1" fill="#CE9152" />
					</svg>
				</span>
			);
		return null;
	};
	const leaderboardData = [
		{
			rank: 1,
			name: "Godji",
			faculty: "คณะ ฟหกฟหกฟหกฟหกฟห",
			score: 5000,
			avatar: "https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128", // ใส่ path รูป avatar
			crown: "gold",
		},
		{
			rank: 2,
			name: "Godji",
			faculty: "คณะ ฟหกฟหกฟหกฟหกฟห",
			score: 4000,
			avatar: "https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128",
			crown: "silver",
		},
		{
			rank: 3,
			name: "Godji",
			faculty: "คณะ ฟหกฟหกฟหกฟหกฟห",
			score: 3000,
			avatar: "https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128",
			crown: "bronze",
		},
		{
			rank: 4,
			name: "Godji",
			faculty: "คณะ ฟหกฟหกฟหกฟหกฟห",
			score: 3000,
			avatar: "https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128",
			crown: "",
		},
		{
			rank: 5,
			name: "Godji",
			faculty: "คณะ ฟหกฟหกฟหกฟหกฟห",
			score: 3000,
			avatar: "https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128",
			crown: "",
		},
	];




	return (
		<>
			<div className="bg-white -mt-5 rounded-[20px] shadow-md p-4 pb-6">
				<div className="rounded-full overflow-hidden w-[100px] h-[100px] mb-4 absolute top-[-90px] left-[20px] border-[4px] border-white">
					<img src="https://cdn.discordapp.com/avatars/300497940617887756/c2a099fa72300f4029ad6e822b080336.webp?size=128" alt="" />
				</div>
				<div className="mt-5">
					<span>สวัสดี' Godji</span>

					{!connectCMU ?

						<div className="bg-[#e5484db3] w-full flex flex-col p-4 rounded-[15px] text-white mt-2 relative">
							<span>คุณยังไม่ได้เชื่อมต่อ CMUSU APP</span>
							<Button className="mt-2" color="red" size={"3"}>
								เชื่อมต่อ
							</Button>
						</div>
						:
						<div className="bg-[#5C5AA3] w-full flex flex-col p-4 rounded-[15px] text-white mt-2 relative">
							<span>คะแนนของคุณ</span>
							<span className="text-3xl font-bold">1,500</span>
							<span className="text-sm text-white/60 mt-2">คุณอยู่ลำดับที่ : 50</span>
							<div className="h-full w-[2px] border-l-2 border-dashed border-white/20 absolute top-0 right-[100px]"></div>
						</div>
					}
				</div>

			</div>


			<div className="mx-4 mt-2">

				<span className="text-lg font-bold">
					ตารางอันดับ
				</span>

				<div className="bg-white">
					<div className="max-w-md mx-auto bg-white rounded-xl shadow p-2">
						<ul>
							{leaderboardData.map((item, idx) => (
								<li
									key={item.rank}
									className="flex items-center py-3 border-b last:border-b-0"
								>
									<div className="flex items-center w-12 justify-center font-bold text-lg">
										{item.rank <= 3 && item.crown ? (
											<CrownIcon type={item.crown as any} />
										) : null}
										<span
											className={`${item.rank === 1
												? "text-[#D8A137]"
												: item.rank === 2
													? "text-[#B0B0B0]"
													: item.rank === 3
														? "text-[#CE9152]"
														: "text-black"
												}`}
										>
											{item.rank}
										</span>
									</div>
									<img
										src={item.avatar}
										alt={item.name}
										className="w-12 h-12 rounded-full object-cover mx-3"
									/>
									<div className="flex-1">
										<div className="font-semibold">{item.name}</div>
										<div className="text-sm text-gray-500">{item.faculty}</div>
									</div>
									<div className="font-semibold text-right text-lg w-16">
										{item.score.toLocaleString()}
									</div>
								</li>
							))}
						</ul>
					</div>

				</div>
			</div>


		</>
	)
}

export default Home
