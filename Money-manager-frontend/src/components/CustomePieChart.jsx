import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const renderCenterLabel = (label, totalAmount) => ({ cx, cy }) => (
    <g>
        <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="500" fill="#222">
            {label}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="700" fill="#222">
            {totalAmount}
        </text>
    </g>
);

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, amount } = payload[0].payload;
        return (
            <div style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 8, padding: 10, boxShadow: '0 2px 8px rgba(67,24,135,0.08)' }}>
                <span style={{ fontWeight: 600, color: '#431887' }}>{name}:</span> <span style={{ color: '#6C2BD9' }}>₹{amount.toLocaleString('en-IN')}</span>
            </div>
        );
    }
    return null;
};


const CustomePieChart = ({ data, label, totalAmount, colors }) => {
    return (
        <div style={{ width: '100%', height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width={260} height={260}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={75}
                        label={renderCenterLabel(label, totalAmount)}
                        labelLine={false}
                        isAnimationActive={true}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 28, marginTop: 18 }}>
                {data.map((entry, idx) => (
                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: colors[idx % colors.length], display: 'inline-block' }}></span>
                        <span style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomePieChart;