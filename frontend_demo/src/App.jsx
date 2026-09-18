import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'podcast-topic-json-data'

const sampleData = {
  overall_summary:
    'The podcast compares India and Pakistan on economic pressure, fuel prices, and political developments while highlighting the recurring cost-of-living concerns across both countries.',
  topic_hierarchy: [
    {
      node_id: 'node_1',
      name: 'India',
      summary: 'The discussion begins with India’s economy and pressure on households.',
      tags: ['india', 'economy', 'fuel prices'],
      start_time: 0,
      end_time: 300,
      sentences: [
        {
          text: "India's economy remains under pressure due to inflation and policy uncertainty.",
          start: 0,
          end: 25,
          speaker: 'Speaker 1',
        },
      ],
      children: [],
    },
  ],
  tags: [
    {
      name: 'india',
      summary: 'India is discussed across multiple sections, covering economic stress and elections.',
      start: 0,
      end: 840,
      sentences: [
        {
          text: "India's economy remains under pressure due to inflation and policy uncertainty.",
          start: 0,
          end: 25,
          speaker: 'Speaker 1',
        },
      ],
      titles: [{ title: 'Why India’s Economy Keeps Feeling So Heavy', start: 0, end: 150 }],
    },
  ],
}

const navGroups = [
  {
    title: 'Main Nav',
    items: [
      { label: 'Dashboard', active: true },
      { label: 'Pages' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Base' },
      { label: 'UI Kits' },
      { label: 'Grid' },
      { label: 'Email' },
    ],
  },
  {
    title: 'Layout',
    items: [{ label: 'Header' }, { label: 'Sidebar' }, { label: 'General' }],
  },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const chartValues = [
  { acme: 32000, guardian: 22000 },
  { acme: 36000, guardian: 30000 },
  { acme: 26000, guardian: 22000 },
  { acme: 44000, guardian: 40000 },
  { acme: 34000, guardian: 30000 },
  { acme: 52000, guardian: 38000 },
  { acme: 46000, guardian: 28000 },
  { acme: 56000, guardian: 42000 },
  { acme: 30000, guardian: 24000 },
  { acme: 42000, guardian: 36000 },
  { acme: 47000, guardian: 42000 },
  { acme: 56000, guardian: 52000 },
]

const inboxItems = [
  { name: 'Joe Meyer', detail: 'Loki has the sheler', time: '12.30pm' },
  { name: 'Amazon Kindle', detail: 'Your Kindle Unlimited', time: '3.30pm' },
  { name: 'Joyce Wagner', detail: '30% off all Products', time: '5.05pm' },
  { name: 'Harry Day', detail: 'Your order is prepping', time: '30 Jul' },
]

const ticketItems = [
  { label: 'Design', value: 560, color: '#8b5cf6' },
  { label: 'Marketing', value: 400, color: '#f4c95d' },
  { label: 'Development', value: 350, color: '#ff8c5a' },
  { label: 'Support', value: 299, color: '#5bc0a7' },
]

export function LegacyDashboard() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return sampleData

    try {
      return JSON.parse(saved)
    } catch {
      return sampleData
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const summaryText = useMemo(
    () => data?.overall_summary || 'No summary available yet. Upload a JSON file to view the podcast analysis.',
    [data],
  )

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      setData(parsed)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    } catch {
      alert('Invalid JSON file. Please upload a valid output from the topic hierarchy pipeline.')
    }

    event.target.value = ''
  }

  const chartWidth = 920
  const chartHeight = 290
  const left = 18
  const top = 18
  const yMax = 60000

  const pointsAcme = chartValues
    .map((point, index) => {
      const x = left + index * ((chartWidth - left * 2) / (chartValues.length - 1))
      const y = chartHeight - (point.acme / yMax) * (chartHeight - top * 2) - top
      return `${x},${y}`
    })
    .join(' ')

  const pointsGuardian = chartValues
    .map((point, index) => {
      const x = left + index * ((chartWidth - left * 2) / (chartValues.length - 1))
      const y = chartHeight - (point.guardian / yMax) * (chartHeight - top * 2) - top
      return `${x},${y}`
    })
    .join(' ')

  const areaGuardPath = `${pointsGuardian} ${chartWidth - left},${chartHeight - top} ${left},${chartHeight - top}`

  return (
    <div className="app-page">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">
              <span>◫</span>
            </div>
            <span className="brand-name">UI KIT</span>
          </div>

          {navGroups.map((group) => (
            <div key={group.title} className="nav-group">
              <p className="nav-group-title">{group.title}</p>
              <nav className="nav-list">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`nav-item ${item.active ? 'is-active' : ''}`}
                  >
                    <span className="nav-icon">◫</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div className="search-box">
              <span className="search-icon">⌕</span>
              <input type="text" value="Search" readOnly aria-label="Search" />
            </div>

            <div className="topbar-actions">
              <label className="upload-button">
                <span>Upload JSON</span>
                <input type="file" accept="application/json" onChange={handleFileUpload} />
              </label>

              <div className="profile-box">
                <div className="avatar">B</div>
                <span>Brittany</span>
                <span className="caret">▾</span>
              </div>
            </div>
          </header>

          <section className="content-area">
            <div className="page-header">
              <h1>Dashboard</h1>
            </div>

            <div className="summary-strip">
              <strong>Analysis:</strong> {summaryText}
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Revenue</h2>

                <div className="chart-controls">
                  <div className="legend-item">
                    <span className="legend-dot green" />
                    <span>Acme studio</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot pink" />
                    <span>Guardian</span>
                  </div>

                  <div className="segmented-control">
                    <button type="button" className="is-selected">Today</button>
                    <button type="button">Week</button>
                    <button type="button" className="is-selected">Month</button>
                    <button type="button">Year</button>
                    <button type="button" className="dots">•••</button>
                  </div>
                </div>
              </div>

              <div className="chart-wrap">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" className="revenue-chart">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <line
                      key={line}
                      x1={left}
                      x2={chartWidth - left}
                      y1={line * 60 + 30}
                      y2={line * 60 + 30}
                      stroke="#dfe5ec"
                      strokeWidth="1"
                    />
                  ))}

                  <polygon points={areaGuardPath} fill="rgba(21, 190, 169, 0.12)" />
                  <polyline points={pointsGuardian} fill="none" stroke="#1fc6ad" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points={pointsAcme} fill="none" stroke="#ef6b8b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {months.map((month, index) => {
                    const x = left + index * ((chartWidth - left * 2) / (months.length - 1))

                    return (
                      <text key={month} x={x} y={chartHeight - 10} textAnchor="middle" className="chart-label">
                        {month}
                      </text>
                    )
                  })}
                </svg>
              </div>
            </div>

            <div className="bottom-grid">
              <div className="info-card">
                <div className="card-header">
                  <h3>Inbox</h3>
                  <button type="button">•••</button>
                </div>

                <ul className="inbox-list">
                  {inboxItems.map((item) => (
                    <li key={item.name}>
                      <div className="avatar-mini">{item.name.charAt(0)}</div>
                      <div className="inbox-copy">
                        <div className="inbox-row">
                          <strong>{item.name}</strong>
                          <span>{item.time}</span>
                        </div>
                        <p>{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-card storage-card">
                <div className="card-header">
                  <h3>Cloud Storage</h3>
                  <button type="button">•••</button>
                </div>

                <div className="donut-wrap">
                  <div className="donut-chart">
                    <div className="donut-inner">
                      <span className="large">68%</span>
                      <span className="small">Used</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card tickets-card">
                <div className="card-header">
                  <h3>Tickets</h3>
                  <button type="button">•••</button>
                </div>

                <div className="tickets-list">
                  {ticketItems.map((ticket) => (
                    <div key={ticket.label} className="ticket-row">
                      <div className="ticket-label">{ticket.label}</div>
                      <div className="ticket-bar-wrap">
                        <span className="ticket-bar" style={{ width: `${(ticket.value / 560) * 100}%`, background: ticket.color }} />
                      </div>
                      <div className="ticket-value">{ticket.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function findNode(nodes, nodeId) {
  for (const node of nodes || []) {
    if (node.node_id === nodeId) return node
    const match = findNode(node.children || [], nodeId)
    if (match) return match
  }
  return null
}

function flattenNodes(nodes, depth = 0) {
  return (nodes || []).flatMap((node) => [
    { ...node, depth },
    ...flattenNodes(node.children || [], depth + 1),
  ])
}

function formatTime(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '—'
  const rounded = Math.round(Number(value) * 100) / 100
  return `${rounded}s`
}

function formatTimestamp(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '—'
  const totalSeconds = Math.max(0, Math.round(Number(value)))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function collectExpandableNodeIds(nodes, ids = new Set()) {
  for (const node of nodes || []) {
    if (node.children?.length) ids.add(node.node_id || node.name)
    collectExpandableNodeIds(node.children, ids)
  }
  return ids
}

function flattenVisibleNodes(nodes, expandedNodeIds, depth = 0) {
  return (nodes || []).flatMap((node) => {
    const nodeId = node.node_id || node.name
    const children = node.children || []
    return [
      { ...node, depth },
      ...(children.length && expandedNodeIds.has(nodeId)
        ? flattenVisibleNodes(children, expandedNodeIds, depth + 1)
        : []),
    ]
  })
}

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return sampleData

    try {
      return JSON.parse(saved)
    } catch {
      return sampleData
    }
  })
  const [view, setView] = useState('hierarchy')
  const [selectedNodeId, setSelectedNodeId] = useState(data?.topic_hierarchy?.[0]?.node_id || null)
  const [selectedTagName, setSelectedTagName] = useState(data?.tags?.[0]?.name || null)
  const [query, setQuery] = useState('')
  const [expandedNodeIds, setExpandedNodeIds] = useState(() => collectExpandableNodeIds(data?.topic_hierarchy))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const hierarchyNodes = useMemo(() => flattenNodes(data?.topic_hierarchy || []), [data])
  const visibleHierarchyNodes = useMemo(
    () => flattenVisibleNodes(data?.topic_hierarchy || [], expandedNodeIds),
    [data, expandedNodeIds],
  )
  const selectedNode = useMemo(
    () => findNode(data?.topic_hierarchy || [], selectedNodeId) || hierarchyNodes[0] || null,
    [data, hierarchyNodes, selectedNodeId],
  )
  const selectedTag = useMemo(
    () => (data?.tags || []).find((tag) => tag.name === selectedTagName) || data?.tags?.[0] || null,
    [data, selectedTagName],
  )
  const filteredTags = (data?.tags || []).filter((tag) => tag.name?.toLowerCase().includes(query.toLowerCase()))

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const parsed = JSON.parse(await file.text())
      setData(parsed)
      setView('hierarchy')
      setSelectedNodeId(parsed?.topic_hierarchy?.[0]?.node_id || null)
      setSelectedTagName(parsed?.tags?.[0]?.name || null)
      setExpandedNodeIds(collectExpandableNodeIds(parsed?.topic_hierarchy))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    } catch {
      alert('Invalid JSON file. Please upload a valid topic hierarchy output file.')
    }

    event.target.value = ''
  }

  const visibleItems = view === 'hierarchy' ? visibleHierarchyNodes.filter((node) => node.name?.toLowerCase().includes(query.toLowerCase())) : filteredTags

  return (
    <div className="workspace-page">
      <aside className="workspace-sidebar">
        <div className="workspace-brand">
          <div className="workspace-brand-mark">◈</div>
          <div>
            <strong>CASTBOARD</strong>
            <span>Podcast intelligence</span>
          </div>
        </div>

        <p className="workspace-nav-label">Workspace</p>
        <button
          type="button"
          className={`workspace-nav-item ${view === 'hierarchy' ? 'is-active' : ''}`}
          onClick={() => setView('hierarchy')}
        >
          <span>⌘</span>
          <span>Topic hierarchy</span>
          <b>{hierarchyNodes.length}</b>
        </button>
        <button
          type="button"
          className={`workspace-nav-item ${view === 'tags' ? 'is-active' : ''}`}
          onClick={() => setView('tags')}
        >
          <span>#</span>
          <span>Tags</span>
          <b>{data?.tags?.length || 0}</b>
        </button>

        <div className="workspace-sidebar-footer">
          <span className="status-dot" />
          <span>Local workspace</span>
        </div>
      </aside>

      <main className="workspace-main">
        <header className="workspace-header">
          <div>
            <p className="workspace-eyebrow">Content intelligence / {view === 'hierarchy' ? 'Structure' : 'Taxonomy'}</p>
            <h1>{view === 'hierarchy' ? 'Topic hierarchy' : 'Tag library'}</h1>
          </div>
          <div className="workspace-header-actions">
            <label className="workspace-upload">
              <span>↑</span> Upload output JSON
              <input type="file" accept="application/json" onChange={handleFileUpload} />
            </label>
            <div className="workspace-user"><span>BC</span><strong>Briefing desk</strong></div>
          </div>
        </header>

        <section className="workspace-content">
          <div className="workspace-summary">
            <div className="summary-icon">✦</div>
            <div>
              <span>Episode overview</span>
              <p>{data?.overall_summary || 'Upload an output JSON file to see the episode overview.'}</p>
            </div>
          </div>

          <div className="split-view">
            <section className="item-panel">
              <div className="item-panel-header">
                <div>
                  <span className="section-kicker">Browse</span>
                  <h2>{view === 'hierarchy' ? 'All topics' : 'All tags'}</h2>
                </div>
                <span className="count-badge">{visibleItems.length}</span>
              </div>

              <label className="filter-box">
                <span>⌕</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${view === 'hierarchy' ? 'topics' : 'tags'}`} />
              </label>

              <div className="item-list">
                {view === 'hierarchy' && visibleItems.map((node) => {
                  const nodeId = node.node_id || node.name
                  const hasChildren = Boolean(node.children?.length)
                  const isExpanded = expandedNodeIds.has(nodeId)
                  return (
                    <div
                      key={nodeId}
                      className={`list-item ${selectedNode?.node_id === nodeId ? 'is-selected' : ''}`}
                      style={{ paddingLeft: `${16 + node.depth * 16}px` }}
                    >
                      <button
                        type="button"
                        className={`tree-toggle ${hasChildren ? '' : 'is-empty'}`}
                        aria-label={hasChildren ? `${isExpanded ? 'Collapse' : 'Expand'} ${node.name}` : `${node.name} has no children`}
                        aria-expanded={hasChildren ? isExpanded : undefined}
                        onClick={() => {
                          if (!hasChildren) return
                          setExpandedNodeIds((current) => {
                            const next = new Set(current)
                            if (next.has(nodeId)) next.delete(nodeId)
                            else next.add(nodeId)
                            return next
                          })
                        }}
                      >
                        {hasChildren ? (isExpanded ? '⌄' : '›') : '·'}
                      </button>
                      <button type="button" className="tree-node-button" onClick={() => setSelectedNodeId(nodeId)}>
                        <span className="tree-marker">{node.depth ? '└' : '◼'}</span>
                        <span className="list-item-copy">
                          <strong>{node.name}</strong>
                          <small><span className="depth-label">L{node.depth + 1}</span>{formatTimestamp(node.start_time)} — {formatTimestamp(node.end_time)} · {node.sentences?.length || 0} sentences</small>
                        </span>
                      </button>
                      <span className="list-chevron">›</span>
                    </div>
                  )
                })}

                {view === 'tags' && filteredTags.map((tag) => (
                  <button
                    key={tag.name}
                    type="button"
                    className={`list-item ${selectedTag?.name === tag.name ? 'is-selected' : ''}`}
                    onClick={() => setSelectedTagName(tag.name)}
                  >
                    <span className="tag-symbol">#</span>
                    <span className="list-item-copy"><strong>{tag.name}</strong><small>{tag.sentences?.length || 0} sentences · {tag.titles?.length || 0} titles</small></span>
                    <span className="list-chevron">›</span>
                  </button>
                ))}

                {!visibleItems.length && <div className="empty-state">No matching {view === 'hierarchy' ? 'topics' : 'tags'}.</div>}
              </div>
            </section>

            <section className="detail-panel">
              {view === 'hierarchy' && selectedNode && (
                <>
                  <div className="detail-heading">
                    <div><span className="section-kicker">Selected topic</span><h2>{selectedNode.name}</h2><p className="speaker-line">{(selectedNode.speakers_involved || ['PODCAST TRANSCRIPT']).join(' · ')}</p></div>
                  </div>
                  <div className="detail-rule" />
                  <div className="topic-overview">
                    <div className="summary-block"><span className="detail-label">Summary</span><p>{selectedNode.summary || 'No summary available for this topic.'}</p><div className="tag-row">{(selectedNode.tags || []).map((tag) => <span key={tag} className="soft-tag">#{tag}</span>)}</div></div>
                    <div className="timeline-block"><span className="detail-label">◷ Timeline spans</span><div className="timeline-span"><b>01</b><strong>{formatTime(selectedNode.start_time)}</strong><i /><strong>{formatTime(selectedNode.end_time)}</strong><small>{selectedNode.end_time != null && selectedNode.start_time != null ? formatTime(selectedNode.end_time - selectedNode.start_time) : '—'}</small></div></div>
                  </div>
                  <div className="detail-rule" />
                  <div className="transcript-heading"><span>◷</span><h3>Sentences in this topic</h3><b>{selectedNode.sentences?.length || 0}</b></div>
                  <div className="sentence-list">{(selectedNode.sentences || []).map((sentence, index) => <article key={`${sentence.start}-${index}`} className="sentence-item"><div><span>{String(index + 1).padStart(2, '0')}</span><time>{formatTime(sentence.start)} — {formatTime(sentence.end)}</time></div><p>{sentence.text}</p><small>{sentence.speaker || 'Speaker'}</small></article>)}</div>
                </>
              )}

              {view === 'tags' && selectedTag && (
                <>
                  <div className="detail-heading"><div><span className="section-kicker">Selected tag</span><h2>#{selectedTag.name}</h2><p className="speaker-line">CONTENT INDEX · {selectedTag.sentences?.length || 0} RELATED SENTENCES</p></div></div>
                  <div className="detail-rule" />
                  <div className="topic-overview"><div className="summary-block"><span className="detail-label">Summary</span><p>{selectedTag.summary || 'No summary available for this tag.'}</p></div><div className="timeline-block"><span className="detail-label">◷ Timeline spans</span><div className="timeline-span"><b>01</b><strong>{formatTime(selectedTag.start)}</strong><i /><strong>{formatTime(selectedTag.end)}</strong><small>{selectedTag.end != null && selectedTag.start != null ? formatTime(selectedTag.end - selectedTag.start) : '—'}</small></div></div></div>
                  <div className="detail-rule" />
                  <div className="transcript-heading"><span>✦</span><h3>YouTube title ideas</h3><b>{selectedTag.titles?.length || 0}</b></div>
                  <div className="title-list">{(selectedTag.titles || []).map((item, index) => <article key={`${item.title}-${index}`} className="title-item"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.title}</strong><small>{formatTime(item.start)} — {formatTime(item.end)}</small></div></article>)}</div>
                  <div className="transcript-heading sentence-heading"><span>◷</span><h3>Sentences with this tag</h3><b>{selectedTag.sentences?.length || 0}</b></div>
                  <div className="sentence-list">{(selectedTag.sentences || []).map((sentence, index) => <article key={`${sentence.start}-${index}`} className="sentence-item"><div><span>{String(index + 1).padStart(2, '0')}</span><time>{formatTime(sentence.start)} — {formatTime(sentence.end)}</time></div><p>{sentence.text}</p><small>{sentence.speaker || 'Speaker'}</small></article>)}</div>
                </>
              )}

              {!selectedNode && !selectedTag && <div className="empty-state">Upload a valid topic hierarchy JSON file to begin.</div>}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
