import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { HiChevronLeft } from "react-icons/hi";
import CameraComponent from "../components/Camera";
import { useState } from "react";

type Props = {
	setTab: (tab: string) => void;
}

function Activity({ setTab }: Props) {
	const [cam, setCam] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);



	return (
		<>

			<div className="flex gap-3 p-4 place-items-center bg-[#373A71]" onClick={() => setTab('home')} >
				<HiChevronLeft className="text-2xl text-white cursor-pointer" />
				<span className="text-white">ส่งกิจกรรม</span>

			</div>

			<div className="mx-4 mt-2">
				<Flex direction="column" gap="3">
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							รูป
						</Text>
						<div className="w-full h-[200px] bg-red-500" onClick={() => setCam(true)} style={{ cursor: "pointer" }}>
							<img src={capturedImage} alt="" />

						</div>
						{cam ? <CameraComponent setCam={setCam} capturedImage={capturedImage} setCapturedImage={setCapturedImage} /> : null}
					</label>
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Email
						</Text>
						<TextField.Root
							defaultValue="freja@example.com"
							placeholder="Enter your email"
						/>
					</label>
				</Flex>

			</div>


		</>
	)
}

export default Activity; 
