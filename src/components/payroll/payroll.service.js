exports.calculateLeaveDeduction = async (employeeId, month, year) => {
    const excess = await pool.query(
        `
    SELECT 
      GREATEST(SUM(end_date - start_date + 1) - 24, 0) AS excess
    FROM leaves
    WHERE employee_id=$1
      AND status='APPROVED'
      AND EXTRACT(MONTH FROM start_date)=$2
      AND EXTRACT(YEAR FROM start_date)=$3
    `,
        [employeeId, month, year]
    );

    return Number(excess.rows[0].excess);
};
