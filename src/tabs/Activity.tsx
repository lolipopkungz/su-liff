import { Button, Callout, Flex, Select, TabNav, Text, TextArea, TextField } from "@radix-ui/themes";
import { HiChevronLeft, HiInformationCircle, HiUpload } from "react-icons/hi";
import CameraComponent from "../components/Camera";
import { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "@liff/get-profile";
import { LiffData } from "../App";

type Props = {
	setTab: (tab: string) => void;
	profile: Profile | null;
	liffData: LiffData | null;
}

function Activity({ setTab, profile, liffData }: Props) {
	const [cam, setCam] = useState(false);
	const [camAfter, setCamAfter] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [capturedImageAfter, setCapturedImageAfter] = useState<string | null>(null);
	const [activity, setActivity] = useState<string>('0');
	const [place, setPlace] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [note, setNote] = useState<string>('');


	const [onGoing, setOnGoing] = useState(false);
	useEffect(() => {
		if (!liffData && !onGoing) {
			setOnGoing(true);
			// alert("กรุณาเชื่อมต่อบัญชีก่อนทำกิจกรรม")
			window.location.href = '/';
		}

	}, [onGoing])



	// per 0 = submit, per 1 = amount mult 
	const eventList: any = {
		"0": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนน พร้อมเห็นแก้วที่พกไปเอง และร้านค้าที่ไปซื้อ",
			point: 10,
			per: 0
		},
		"1": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนน พร้อมถุงผ้า และสินค้าที่ ไม่ใช้ถุงพลาสติก ",
			point: 5,
			per: 1
		},
		"2": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนน พร้อมลักษณะที่ยื่นมือทิ้ง ขยะลงถังขยะถูกประเภท",
			point: 2,
			per: 1
		},
		"3": {
			info: "ระยะทางสะสม 2 กิโลเมตร : 20 คะแนน",
			point: 0,
			per: 0
		},
		"4": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนน ตอนนั่งรถม่วง พร้อม ภาพหน้าจอการจองคิวรถ ระยะทางในแอพ cmu mobile",
			point: 0,
			per: 0
		},
		"5": {
			info: "ถ่ายวิดีโอ ที่เห็นหน้าผู้สะสม คะแนนขณะกำลังเดินไปเรียน สั้นๆ (ถ้ามีฟงัก์ชั่นอธิบายตอน สะสมคะแนน ให้อธิบายสั้นๆ เกี่ยวกับเป้าหมายที่กำลังไป) ",
			point: 0,
			per: 0
		},
		"6": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนนในตอนที่กำลังออกตัวจาก การขี่จักรยาน ",
			point: 0,
			per: 0
		},
		"7": {
			info: "ถ่ายภาพ/วิดีโอ ที่เห็นหน้าผู้สะสม คะแนน พร้อมเห็นกล่องอาหาร และร้านค้าที่ไปซื้อ ",
			point: 10,
			per: 0
		},
	}


	const [mode, setMode] = useState<'img' | 'vid'>('img');
	const [file, setFile] = useState<File | null>(null);
	const [progress, setProgress] = useState<number>(0);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {

			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setProgress(0);
			setMessage("");

			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const handleUpload = async () => {
		if (!file) {
			setMessage("Please select a video first!");
			return;
		}

		const formData = new FormData();
		formData.append("video", file);

		try {
			setUploading(true);
			setMessage("");

			await axios.post("http://localhost:7000/upload-video", formData, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (progressEvent) => {
					if (progressEvent.total) {
						const percent = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setProgress(percent);
					}
				},
			}).then((response) => {
				console.log(response.data);
				if (response.status !== 200) {
					setMessage("Upload failed!");
					return
				}
				setPreviewUrl(response.data.videoUrl);
			})

		} catch (error) {
			console.error(error);
			setMessage("Upload failed!");
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async () => {
		const response = await axios.post(import.meta.env.VITE_ENDPOINT + "/submit_event", {
			mode,
			before: mode === "img" ? capturedImage : previewUrl,
			after: activity === "6" && mode === "img" ? capturedImageAfter : null,
			activity,
			place,
			note,
			amount


		}, {
			headers: { "Content-Type": "application/json", "x-line": localStorage.getItem("lineId") ?? "" },
		});

	}

	return (
		<>

			<div className="flex gap-3 p-4 place-items-center bg-[#373A71]" onClick={() => setTab('home')} >
				<HiChevronLeft className="text-2xl text-white cursor-pointer" />
				<span className="text-white">ส่งกิจกรรม</span>

			</div>

			<div className="overflow-auto max-h-[100vh] bg-white">
				<Flex direction="column" gap="3" className="mx-4 mt-2 pb-[200px]">

					<TabNav.Root>
						<TabNav.Link href="#" active={mode === 'img'} onClick={() => setMode('img')}>รูปภาพ</TabNav.Link>
						<TabNav.Link href="#" active={mode === "vid"} onClick={() => setMode('vid')}>วิดีโอ</TabNav.Link>
					</TabNav.Root>

					{mode === 'vid' ? (
						<div>

							<Text as="div" size="2" mb="1" weight="bold">
								วิดีโอ
							</Text>

							{previewUrl && (
								<div className="mb-4">
									<video
										src={previewUrl}
										controls
										className="w-full rounded-lg shadow-md"
									/>
								</div>
							)}

							<input
								type="file"
								accept="video/*"
								onChange={handleFileChange}
								className="mb-4"
							/>

							{file && (
								<p className="text-sm text-gray-600 mb-2">
									Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
								</p>
							)}

							{previewUrl?.includes("blob:") && (
								<button
									onClick={handleUpload}
									disabled={uploading}
									className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
								>
									{uploading ? "Uploading..." : "Upload"}
								</button>
							)}

							{uploading && (
								<div className="mt-4">
									<div className="w-full bg-gray-200 rounded-full h-4">
										<div
											className="bg-blue-500 h-4 rounded-full transition-all duration-200"
											style={{ width: `${progress}%` }}
										></div>
									</div>
									<p className="text-sm mt-1">{progress}%</p>
								</div>
							)}

							{message && <p className="mt-3 text-center">{message}</p>}
						</div>
					) : null}

					{mode === 'img' ? (<>
						{activity === "6" ? (
							<>
								<label>
									<Text as="div" size="2" mb="1" weight="bold">
										รูป (Before)
									</Text>
									<div className="w-full h-[200px] border-dashed border-gray-400 border-2 rounded-md bg-center bg-cover bg-no-repeat" onClick={() => setCam(true)} style={{
										cursor: "pointer",
										backgroundImage: capturedImage ? `url(${capturedImage})` : undefined,
									}}>
										{!capturedImage ? <div className="w-full h-full flex items-center justify-center text-gray-500">คลิกเพื่อถ่ายภาพ</div> : null}

									</div>
									{cam ? <CameraComponent setCam={setCam} capturedImage={capturedImage} setCapturedImage={setCapturedImage} /> : null}
								</label>

								<label>
									<Text as="div" size="2" mb="1" weight="bold">
										รูป (After)
									</Text>
									<div className="w-full h-[200px] border-dashed border-gray-400 border-2 rounded-md bg-center bg-cover bg-no-repeat" onClick={() => setCamAfter(true)} style={{
										cursor: "pointer",
										backgroundImage: capturedImageAfter ? `url(${capturedImageAfter})` : undefined,
									}}>
										{!capturedImageAfter ? <div className="w-full h-full flex items-center justify-center text-gray-500">คลิกเพื่อถ่ายภาพ</div> : null}

									</div>
									{camAfter ? <CameraComponent setCam={setCamAfter} capturedImage={capturedImageAfter} setCapturedImage={setCapturedImageAfter} /> : null}
								</label>

							</>

						) :
							(<label>
								<Text as="div" size="2" mb="1" weight="bold">
									รูป
								</Text>
								<div
									className="w-full h-[200px] border-dashed border-gray-400 border-2 rounded-md bg-center bg-cover bg-no-repeat"
									onClick={() => setCam(true)}
									style={{
										cursor: "pointer",
										backgroundImage: capturedImage ? `url(${capturedImage})` : undefined,
									}}
								>
									{!capturedImage ? <div className="w-full h-full flex items-center justify-center text-gray-500">คลิกเพื่อถ่ายภาพ</div> : null}

								</div>

								{cam ? <CameraComponent setCam={setCam} capturedImage={capturedImage} setCapturedImage={setCapturedImage} /> : null}
							</label>)}
					</>) : null}

					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							กิจกรรม
						</Text>
						<div className="w-full flex">
							<Select.Root value={activity} size={"3"} onValueChange={(value) => setActivity(value)}>
								<Select.Trigger className="w-full" />
								<Select.Content>
									<Select.Group>
										<Select.Item value="0">การพกแก้วน้ำส่วนตัว (ไปคา
											เฟ่ ร้านน้ำ ฯลฯ) </Select.Item>
										<Select.Item value="1">การใช้ถุงผ้า ลดการใช้
											ถุงพลาสติก </Select.Item>
										<Select.Item value="2">การแยกขยะถูกประเภท</Select.Item>
										<Select.Item value="3">การลดคาร์บอนฟู้ดปริ้นท</Select.Item>
										<Select.Item value="4">การใช้รถม่วงมอ</Select.Item>
										<Select.Item value="5">การเดินไปเรียน</Select.Item>
										<Select.Item value="6">การใช้จักรยาน</Select.Item>
										<Select.Item value="7">การใช้กล่องอาหารแทนการ
											ใช้กล่องพลาสติก</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>
					</label>



					{eventList[activity] ? <label>
						<Text as="div" size="2" mb="1" weight="bold">
							รายละเอียดกิจกรรม
						</Text>
						<div className="w-full flex">
							<Callout.Root size="2">
								<Callout.Icon>
									<HiInformationCircle />
								</Callout.Icon>
								<Callout.Text>
									{eventList[activity].info}
								</Callout.Text>
							</Callout.Root>
						</div>
					</label> : null}



					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							คะแนนที่จะได้รับ
						</Text>
						<div className="w-full flex">
							<span className="font-bold text-green-700 text-xl">{eventList[activity] ? eventList[activity].point : 0} คะแนน</span>
						</div>
					</label>


					<label>
						<Text as="div" size="2" mb="1" weight="bold">ชื่อสถานที่</Text>
						<TextField.Root size="3" placeholder="ระบุชื่อสถานที่" value={place} onChange={(e) => setPlace(e.currentTarget.value)} />
					</label>


					{!["4", "5", "6"].includes(activity) ? (
						<label>
							<Text as="div" size="2" mb="1" weight="bold">จำนวน (ชิ้น)</Text>
							<TextField.Root size="3"
								value={amount}
								onChange={(e) => setAmount(e.currentTarget.value)}
								placeholder="จำนวน" />
						</label>) : null}




					<label>
						<Text as="div" size="2" mb="1" weight="bold">หมายเหตุ</Text>
						<TextArea size="3" placeholder="ระบุหมายเหตุ" value={note} onChange={(e) => setNote(e.currentTarget.value)} />
					</label>



					<Button size={'3'} mt={'5'} onClick={handleSubmit}>
						<HiUpload /> ส่งกิจกรรม
					</Button>


				</Flex>

			</div>


		</>
	)
}

export default Activity; 
