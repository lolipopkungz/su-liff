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

export default CrownIcon;
