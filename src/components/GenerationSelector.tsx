import React, { useState, useEffect } from "react";
import { sanitizeInput } from "../utility/utility";
import { getGameData } from "../services/apiServices";

interface Games {
	game_id: number;
	game_name: string;
}

interface GameVersions {
	group_id: number;
	game_version: Games[];
}

interface PokemonGeneration {
	gen_name: string;
	gen_id: number;
	game_versions: GameVersions[];
}

interface GenerationInfo {
	generation: PokemonGeneration[];
}

const GenerationSelector: React.FC = () => {
	const [gameData, setGameData] = useState<GenerationInfo | null>(null);
	const [selectedGeneration, setSelectedGeneration] =
		useState<PokemonGeneration | null>(null);
	const [selectedVersionGroup, setSelectedVersionGroup] = useState<
		number | null
	>(null);

	useEffect(() => {
		const fetchGameData = async () => {
			try {
				const data = await getGameData();
				setGameData(data.data);
			} catch (error) {
				console.error("Error fetching Game Information:", error);
			}
		};
		fetchGameData();
	}, []);

	const handleGenerationChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedId = parseInt(event.target.value);
		const generation = gameData?.generation.find(
			(gen) => gen.gen_id === selectedId
		);
		setSelectedGeneration(generation || null);
	};

	const handleGameVersionChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedGroupId = parseInt(event.target.value);
		setSelectedVersionGroup(selectedGroupId);
	};

	const getGen = () => {
		return selectedGeneration;
	};

	const getVersionGroup = () => {
		return selectedVersionGroup;
	};

	return (
		<div>
			<label className='form-control w-full max-w-xs'>
				<div className='label'>
					<span className='label-text'>Select Generation:</span>
				</div>

				<select
					id='generation'
					className='select w-full max-w-xs'
					onChange={handleGenerationChange}>
					<option value=''>-- Select Generation --</option>
					{gameData?.generation.map((gen) => (
						<option key={gen.gen_id} value={gen.gen_id}>
							{sanitizeInput(gen.gen_name).toLocaleUpperCase()}
						</option>
					))}
				</select>
			</label>

			{selectedGeneration && selectedGeneration.game_versions && (
				<label className='form-control w-full max-w-xs'>
					<div className='label'>
						<span className='label-text'>Select Game:</span>
					</div>
					<select
						className='select w-full max-w-xs'
						id='game-version'
						onChange={handleGameVersionChange}>
						<option value=''>-- Select Game Version --</option>
						{selectedGeneration.game_versions.map((group) =>
							group.game_version.map((game) => (
								<option key={game.game_id} value={group.group_id}>
									{sanitizeInput(game.game_name).toLocaleUpperCase()}
								</option>
							))
						)}
					</select>
				</label>
			)}
		</div>
	);
};

export default GenerationSelector;
