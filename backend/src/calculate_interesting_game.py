from .get_total_lead_changes import getTotalLeadChanges

def calculateInterestGame(score_data):
    # Key Metrics
    total_lead_changes = getTotalLeadChanges(score_data)
    fourth_quarter_lead_changes = getTotalLeadChanges(score_data, quarter=4)

    final_home_score = score_data[-1]["homeScore"]
    final_visitor_score = score_data[-1]["visitorScore"]
    score_difference = abs(final_home_score - final_visitor_score)

    # Adjusted Normalization for Score Difference (using quadratic scaling)
    if score_difference >= 30:
        normalized_score_diff = 0  # Too large difference -> no points
    else:
        # Quadratic penalty: larger differences reduce points more sharply
        normalized_score_diff = (30 - score_difference) ** 2 / 900 * 30  # Out of 30 points

    # Normalize other Metrics
    normalized_total_lead_changes = min(total_lead_changes, 15) / 15 * 30  # Out of 30 points
    normalized_fourth_quarter_lead_changes = min(fourth_quarter_lead_changes, 10) / 10 * 40  # Out of 40 points

    # Interest Score Calculation
    interest_score = (
        normalized_score_diff +
        normalized_total_lead_changes +
        normalized_fourth_quarter_lead_changes
    )

    # Clamp to 1-100 range
    return max(1, min(100, round(interest_score)))
