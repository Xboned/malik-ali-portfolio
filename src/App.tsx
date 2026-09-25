import { useCallback, useEffect, useId, useRef, useState } from "react"
import { StatusClock } from "./StatusClock"
import { WaveBackdrop } from "./WaveBackdrop"
import { categories, START_CATEGORY, type Block, type Item } from "./data"
import "./App.css"

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case "jobs":
            return (
              <div key={index}>
                {block.jobs.map((job) => (
                  <article className="job" key={job.title}>
                    <h3>{job.title}</h3>
                    <p className="job-meta">{job.meta}</p>
                    <ul>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )
          case "link":
            return (
              <div className="panel-links" key={index}>
                <a
                  href={block.href}
                  {...(block.download ? { download: true } : {})}
                  {...(block.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {block.label}
                </a>
              </div>
            )
          default: {
            const _never: never = block
            return _never
          }
        }
      })}
    </>
  )
}

export default function App() {
  const [catIndex, setCatIndex] = useState(START_CATEGORY)
  const [itemIndex, setItemIndex] = useState(0)
  const [openItem, setOpenItem] = useState<Item | null>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const labelId = useId()

  const category = categories[catIndex]
  const items = category.items

  const open = useCallback((item: Item) => {
    if (item.body) {
      setOpenItem(item)
      return
    }
    if (item.href) {
      window.location.assign(item.href)
    }
  }, [])

  const close = useCallback(() => {
    setOpenItem(null)
    shellRef.current?.focus()
  }, [])

  useEffect(() => {
    shellRef.current?.focus()
  }, [])

  useEffect(() => {
    if (openItem) {
      closeRef.current?.focus()
    }
  }, [openItem])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (openItem) {
        if (event.key === "Escape") {
          event.preventDefault()
          close()
          return
        }
        if (event.key === "Tab" && panelRef.current) {
          const focusable = [
            ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button"),
          ]
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }
        return
      }

      const lastItem = Math.max(0, items.length - 1)
      const lastCat = categories.length - 1

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setCatIndex((current) => Math.max(0, current - 1))
        setItemIndex(0)
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        setCatIndex((current) => Math.min(lastCat, current + 1))
        setItemIndex(0)
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        setItemIndex((current) => Math.max(0, current - 1))
      } else if (event.key === "ArrowDown") {
        event.preventDefault()
        setItemIndex((current) => Math.min(lastItem, current + 1))
      } else if (event.key === "Home") {
        event.preventDefault()
        setItemIndex(0)
      } else if (event.key === "End") {
        event.preventDefault()
        setItemIndex(lastItem)
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        const item = items[itemIndex]
        if (item) open(item)
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close, itemIndex, items, open, openItem])

  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <div
        className="shell"
        ref={shellRef}
        tabIndex={-1}
        onTouchStart={(event) => {
          const point = event.changedTouches[0]
          touchStart.current =
            point == null ? null : { x: point.clientX, y: point.clientY }
        }}
        onTouchEnd={(event) => {
          if (openItem || touchStart.current == null) return
          const point = event.changedTouches[0]
          if (point == null) return
          const dx = point.clientX - touchStart.current.x
          const dy = point.clientY - touchStart.current.y
          touchStart.current = null
          if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dx) > 40) {
            if (dx > 0) {
              setCatIndex((current) => Math.max(0, current - 1))
              setItemIndex(0)
            } else {
              setCatIndex((current) => Math.min(categories.length - 1, current + 1))
              setItemIndex(0)
            }
            return
          }
          if (Math.abs(dy) > 40) {
            const lastItem = Math.max(0, items.length - 1)
            if (dy > 0) {
              setItemIndex((current) => Math.max(0, current - 1))
            } else {
              setItemIndex((current) => Math.min(lastItem, current + 1))
            }
          }
        }}
      >
        <WaveBackdrop />

        <div className="profile">
          <p className="profile-name">Malik Ali</p>
          <StatusClock />
          <div className="profile-battery" aria-hidden="true">
            <img src="/assets/icons/battery.png" alt="" width={51} height={51} />
          </div>
        </div>

        <div className="xmb" id="menu">
          <div
            className="category-row"
            data-index={String(catIndex)}
            role="tablist"
            aria-label="Categories"
          >
            {categories.map((entry, index) => {
              const selected = index === catIndex
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={selected ? "icon-btn is-active" : "icon-btn"}
                  role="tab"
                  aria-label={entry.label}
                  aria-selected={selected}
                  aria-controls={labelId}
                  id={`${entry.id}-tab`}
                  onClick={() => {
                    setCatIndex(index)
                    setItemIndex(0)
                    setOpenItem(null)
                  }}
                >
                  <img src={entry.icon} alt="" width={100} height={100} />
                  {selected ? (
                    <span className="category-label">{entry.label}</span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div
            className="item-column"
            key={category.id}
            id={labelId}
            role="listbox"
            aria-label={`${category.label} items`}
            aria-activedescendant={`${category.id}-${items[itemIndex]?.id ?? "none"}`}
          >
            {items.map((item, index) => {
              const selected = index === itemIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`${category.id}-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  className={selected ? "item is-active" : "item"}
                  onClick={() => {
                    setItemIndex(index)
                    open(item)
                  }}
                >
                  <span className="item-icon">
                    <img src={item.icon} alt="" width={100} height={100} />
                  </span>
                  <span className="item-copy">
                    <span className="item-title">{item.title}</span>
                    <hr className="item-rule" />
                    <span className="item-sub">{item.subtitle}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="hint">
          Arrow keys move. Enter opens. Esc closes. Swipe on a phone.
        </p>

        {openItem ? (
          <>
            <button
              type="button"
              className="panel-backdrop"
              aria-label="Close panel"
              onClick={close}
            />
            <aside
              className="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="panel-title"
            >
              <button
                ref={closeRef}
                type="button"
                className="panel-close"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
              <h2 id="panel-title">{openItem.title}</h2>
              <p className="panel-kicker">{openItem.subtitle}</p>
              {openItem.body ? <Blocks blocks={openItem.body} /> : null}
            </aside>
          </>
        ) : null}
      </div>
    </>
  )
}
