import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].payload) {
        const { month, totalAmount, items } = payload[0].payload;

        return (
            <div style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px rgba(67,24,135,0.08)' }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{month}</div>
                <div style={{ fontWeight: 600, color: '#6C2BD9', marginBottom: 6 }}>Total: ₹{totalAmount.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 13, color: '#222' }}>Details:</div>
                {
                    items.map((item, idx) => (
                        <div key={idx} style={{ fontSize: 13, color: '#222', marginLeft: 6 }}>
                            {item.name}: <span style={{ color: '#6C2BD9' }}>₹{Number(item.amount).toLocaleString('en-IN')}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
    return null;
};

const CustomeLineChart = ({ data }) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6C2BD9" stopOpacity={0.25} />

                            <stop offset="95%" stopColor="#6C2BD9" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 13 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fontSize: 13 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#6C2BD9"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                        activeDot={{ r: 7 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomeLineChart