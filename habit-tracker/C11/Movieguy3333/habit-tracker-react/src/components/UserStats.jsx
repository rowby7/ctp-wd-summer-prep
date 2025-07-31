import { useHabit } from "../contexts/HabitContext";

function UserStats() {
  const { userStats } = useHabit();
  return (
    <div className="user-stats">
      {" "}
      <h1 className="section-header">User Stats</h1>
      <h2 className="user-info">
        User Streak:{" "}
        {userStats.streak ? userStats.streak : "User streak not available"}
      </h2>
    </div>
  );
}

export default UserStats;
