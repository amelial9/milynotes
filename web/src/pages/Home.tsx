import { Link } from 'react-router-dom'
import { CATEGORIES } from '../categories'

export default function Home() {
  return (
    <section className="categories" aria-labelledby="categories-heading">
      <h2 id="categories-heading">Categories</h2>
      <div className="grid">
        {CATEGORIES.map((c) => (
          <article key={c.id} className="card">
            <h3 className="card__title">{c.name}</h3>
            <hr className="card__rule" />
            {c.subtitle ? (
              <p className="card__subtitle">{c.subtitle}</p>
            ) : (
              <p className="card__subtitle" />
            )}
            <Link className="card__details" to={`/category/${c.id}`}>
              Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
