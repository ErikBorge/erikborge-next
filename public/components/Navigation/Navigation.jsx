import Link from "next/link";

const Navigation = ({ nextItemHref, prevItemHref }) => {
  return (
    <div className="navigation">
      <div className="navigation__prev">
        {prevItemHref && <Link href={prevItemHref}>Forrige tjaf</Link>}
      </div>

      <div className="navigation__next">
        {nextItemHref && <Link href={nextItemHref}>Neste tjaf</Link>}
      </div>
    </div>
  );
};

export default Navigation;
