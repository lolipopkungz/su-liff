import { Button, Flex } from "@radix-ui/themes";
import { HiChevronLeft, HiLink } from "react-icons/hi";
import { Profile } from "@liff/get-profile";
import { LiffData } from "../App";

type Props = {
	setTab: (tab: string) => void;
	connectCMU: boolean;
	profile: Profile | null;
	liffData: LiffData | null;
}

function Connected({ setTab, connectCMU, profile, liffData }: Props) {

	const handleConfirm = () => {
		window.location.href = '/';
	}

	const handleCancel = () => {
		window.location.href = '/';
	}
	return (
		<>

			<div className="flex gap-3 p-4 place-items-center bg-[#373A71]" onClick={() => setTab('home')} >
				<HiChevronLeft className="text-2xl text-white cursor-pointer" />
				<span className="text-white">Connected</span>

			</div>

			<div className="fixed top-1/2 -translate-y-[60%] w-full">
				{connectCMU && profile && liffData ? (
					<div className="mx-4 mt-4">
						<Flex direction="column" gap="4">
							<div className="flex items-center gap-3 p-4 rounded-2xl shadow-md bg-white">
								<img
									src={profile.pictureUrl ?? ""}
									alt="LINE Profile"
									className="w-12 h-12 rounded-full border"
								/>
								<div>
									<p className="font-semibold text-gray-800">
										{profile.displayName}
									</p>
									<p className="text-sm text-gray-500">LINE Account</p>
								</div>
							</div>

							<div className="flex items-center my-2">
								<div className="flex-grow border-t border-gray-300"></div>
								<span className="px-2 text-gray-500 text-2xl"><HiLink /></span>
								<div className="flex-grow border-t border-gray-300"></div>
							</div>

							<div className="flex items-center gap-3 p-4 rounded-2xl shadow-md bg-white">
								<img
									src={`https://oauth.cmu.ac.th/v2/Images/cmu_logo.png`}
									alt="CMU Profile"
									className="w-12 h-12 rounded-full border"
								/>
								<div>
									<p className="font-semibold text-gray-800">
										{liffData.firstname_TH} {liffData.lastname_TH} ({liffData.student_id})
									</p>
									<p className="text-sm text-gray-500">{liffData.itaccounttype_TH}</p>
									<p className="text-sm text-gray-500">
										{liffData.organization_name_TH}
									</p>
								</div>
							</div>
						</Flex>

						<div className="grid grid-cols-2 gap-4 mt-6">
							<Button variant="solid" size={"3"} radius="large" className="py-7"
								onClick={handleConfirm}
							>
								ยืนยันและเชื่อมต่อ
							</Button>
							<Button
								onClick={handleCancel}
								radius="large"
								variant="outline"
								color="red"
								size={"3"}
								className="py-7"
							>
								ยกเลิก
							</Button>
						</div>
					</div>
				) : (
					<div className="mx-4 mt-6 text-center text-gray-400">
						ยังไม่ได้เชื่อมบัญชี
					</div>
				)}

			</div>


		</>
	)
}

export default Connected; 
