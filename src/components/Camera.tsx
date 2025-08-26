import React, { useRef, useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
type Props = {
	setCam: (cam: boolean) => void;
	capturedImage: string | null;
	setCapturedImage: (image: string | null) => void;
};

const FullscreenCamera = ({ setCam, capturedImage, setCapturedImage }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	const [isCaptured, setIsCaptured] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		setLoading(true);
		setError(null);

		async function startCamera() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "environment" },
				});
				if (!active) return;
				streamRef.current = stream;
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.onloadedmetadata = () => {
						videoRef.current?.play();
						setLoading(false);
					};
				}
			} catch (e) {
				setError("ไม่สามารถเข้าถึงกล้องได้ (โปรดอนุญาตการเข้าถึงกล้อง)");
				setLoading(false);
			}
		}

		startCamera();

		return () => {
			active = false;
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
			}
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
		};
	}, []);

	const handleCapture = () => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (video && canvas) {
			const width = video.videoWidth || 640;
			const height = video.videoHeight || 480;
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(video, 0, 0, width, height);
				setCapturedImage(canvas.toDataURL("image/png"));
				setIsCaptured(true);
				setShowConfirm(false);
				setTimeout(() => setShowConfirm(true), 200); // ป้องกัน ghost click
				if (streamRef.current) {
					streamRef.current.getTracks().forEach((track) => track.stop());
					streamRef.current = null;
				}
				if (videoRef.current) {
					videoRef.current.srcObject = null;
				}
			}
		}
	};

	const handleClose = () => {
		setCam(false);
	}

	const handleRetake = async () => {
		setCapturedImage(null);
		setIsCaptured(false);
		setShowConfirm(false);
		setLoading(true);
		setError(null);

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" },
			});
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.onloadedmetadata = () => {
					videoRef.current?.play();
					setLoading(false);
				};
			}
		} catch (e) {
			setError("ไม่สามารถเข้าถึงกล้องได้ (โปรดอนุญาตการเข้าถึงกล้อง)");
			setLoading(false);
		}
	};

	const handleConfirm = () => {
		// alert("ภาพได้รับการยืนยันแล้ว 🎉");
		setCam(false);
		// ส่งรูปไป server ตรงนี้ได้
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 1000,
				background: "black",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				pointerEvents: "none",
			}}
		>
			{error && (
				<div
					style={{
						color: "red",
						position: "absolute",
						top: 20,
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: 10,
					}}
				>
					{error}
				</div>
			)}

			{loading && (
				<div
					style={{
						color: "white",
						fontSize: 22,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						zIndex: 10,
					}}
				>
					กำลังโหลดกล้อง...
				</div>
			)}

			{!isCaptured && (
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					style={{
						width: "100vw",
						height: "100vh",
						objectFit: "cover",
						background: "black",
						position: "absolute",
						top: 0,
						left: 0,
						pointerEvents: "none",
						zIndex: 1,
					}}
				/>
			)}

			{/* ปุ่มถ่ายรูปแบบ iPhone */}
			{!isCaptured && !loading && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						textAlign: "center",
						width: "100vw",
						height: "100vh",
						zIndex: 10,
					}}
				>

					<button
						type="button"
						onClick={handleClose}
						style={{
							position: "absolute",
							top: 10,
							right: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							pointerEvents: "auto",
							outline: "none",
							padding: 0,
							transition: "box-shadow 0.15s, border-color 0.15s",
						}}
						className="text-white bg-red-500 p-4 rounded-full"
						aria-label="ถ่ายรูป"
					>
						<HiX className="text-2xl m-1" />
					</button>
					<button
						type="button"
						onClick={handleCapture}
						style={{
							position: "absolute",
							bottom: 48,
							left: "50%",
							transform: "translateX(-50%)",
							width: 70,
							height: 70,
							borderRadius: "50%",
							border: "4px solid rgba(255,255,255,1)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							pointerEvents: "auto",
							outline: "none",
							padding: 0,
							transition: "box-shadow 0.15s, border-color 0.15s",
						}}
						aria-label="ถ่ายรูป"
					>
						<span
							style={{
								display: "block",
								width: 56,
								height: 56,
								borderRadius: "50%",
								background: "#9593E1",
								border: "none",
							}}
						/>
					</button>
				</div>
			)}

			{/* Preview & ปุ่มยืนยัน/ถ่ายใหม่ */}
			{isCaptured && capturedImage && showConfirm && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						textAlign: "center",
						pointerEvents: "none",
						zIndex: 90,
					}}
				>
					<img
						src={capturedImage}
						alt="captured"
						style={{
							maxWidth: "90vw",
							maxHeight: "70vh",
							border: "4px solid white",
							borderRadius: "12px",
							userSelect: "none",
							pointerEvents: "none",
						}}
						draggable={false}
					/>
					<div style={{ marginTop: 18, pointerEvents: "none" }}>
						<button
							type="button"
							onClick={handleConfirm}
							style={{
								marginRight: 12,
								padding: "12px 24px",
								fontSize: 18,
								background: "#4caf50",
								color: "white",
								border: "none",
								borderRadius: 8,
								cursor: "pointer",
								pointerEvents: "auto",
							}}
						>
							ยืนยัน
						</button>
						<button
							type="button"
							onClick={handleRetake}
							style={{
								padding: "12px 24px",
								fontSize: 18,
								background: "#f44336",
								color: "white",
								border: "none",
								borderRadius: 8,
								cursor: "pointer",
								pointerEvents: "auto",
							}}
						>
							ถ่ายใหม่
						</button>
					</div>
				</div>
			)}

			<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>
	);
};

export default FullscreenCamera;
