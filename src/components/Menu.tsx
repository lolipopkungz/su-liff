import { HiBell, HiHome, HiUpload } from "react-icons/hi"
const Menu = () => {
	return (
		<div className="bg-white flex justify-between items-center p-4 py-2.5 fixed bottom-0 w-full">
			<div className="nav active">
				<HiHome className="text-2xl" />
				<span>หน้าแรก</span>
			</div>

			<div className="nav">
				<HiUpload className="text-2xl" />
				<span>ส่งกิจกรรม</span>
			</div>

			<div className="nav">
				<HiBell className="text-2xl" />
				<span>การแจ้งเตือน</span>
			</div>

		</div>
	)
}

export default Menu
