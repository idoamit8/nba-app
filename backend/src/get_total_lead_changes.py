def getTotalLeadChanges(score_data, quarter=None):
    lead_changes = 0
    previous_leader = None  # Keep track of the previous leader: "home", "visitor", or None

    for entry in score_data:
        # Filter by quarter if specified
        if quarter and entry["quarter"] != quarter:
            continue

        # Determine the current leader based on the scores
        if entry["homeScore"] > entry["visitorScore"]:
            current_leader = "home"
        elif entry["visitorScore"] > entry["homeScore"]:
            current_leader = "visitor"
        else:
            current_leader = None  # Tie situation, no leader

        # Check if the leader has changed since the last entry
        if previous_leader and current_leader != previous_leader:
            lead_changes += 1

        # Update the previous leader for the next iteration
        previous_leader = current_leader

    return lead_changes

