const RankingTable = ({ data }) => {
  return (
    <div style={cardContainer}>
      <div style={scrollArea}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCell}>#</th>
              <th style={headerCell}>👤 Joueur</th>
              <th style={headerCell}>🎯 Manches</th>
              <th style={headerCell}>📊 % gagnées</th>
              <th style={headerCell}>✅ Points +</th>
              <th style={headerCell}>❌ Points -</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.opponent} style={i % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                <td style={cellStyle}>{getRankIcon(i)}</td>
                <td style={userCellStyle} title={row.opponent}>{row.opponent}</td>
                <td style={cellStyle}>{row.manches}</td>
                <td style={{ ...cellStyle, color: getPercentColor(row.pourcentage_gagnees_val) }}>
                  {row.pourcentage_gagnees}
                </td>
                <td style={cellStyle}>{row.points_marques}</td>
                <td style={cellStyle}>{row.points_encaisses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;

// === Utilitaires ===
const getRankIcon = (index) => {
  switch (index) {
    case 0: return '🥇';
    case 1: return '🥈';
    case 2: return '🥉';
    default: return index + 1;
  }
};

const getPercentColor = (ratio) => {
  if (ratio >= 0.7) return 'green';
  if (ratio >= 0.5) return 'orange';
  return 'red';
};

// === Styles ===

const cardContainer = {
  width: '100%',
  maxWidth: '100%',
  backgroundColor: 'white',
  borderRadius: 12,
  padding: '8px 0px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 29vh)' // ajustable selon hauteur de la navbar
};

const scrollArea = {
  flex: 1,
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'auto' // ✅ largeur adaptée au contenu
};

const headerCell = {
  padding: '8px 4px',
  backgroundColor: '#003E6B',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '13px',
  position: 'sticky',
  top: 0,
  zIndex: 1
};

const cellStyle = {
  padding: '6px 4px',
  textAlign: 'center',
  fontSize: '13px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const userCellStyle = {
  ...cellStyle,
  textAlign: 'left',
  paddingLeft: 12,
  maxWidth: 160
};

const rowStyleEven = {
  backgroundColor: '#f9f9f9'
};

const rowStyleOdd = {
  backgroundColor: '#fff'
};
