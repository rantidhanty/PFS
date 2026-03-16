import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { blogPosts, getBlogPost, formatDate } from "@/lib/blog";
import { siteConfig, waUrl } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const categoryColor: Record<string, string> = {
  Panduan: "bg-orange-100 text-orange-800",
  Edukasi: "bg-sky-100 text-sky-800",
  Tips: "bg-emerald-100 text-emerald-800",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${slug}` },
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-600">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-600">Blog</Link>
          <span>/</span>
          <span className="text-zinc-600 line-clamp-1">{post.title}</span>
        </nav>

        {/* Article header */}
        <div className="mb-6 rounded-3xl border border-zinc-200 bg-white overflow-hidden">
          {/* Cover image */}
          <div className="relative aspect-video w-full bg-zinc-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain p-6"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${categoryColor[post.category] ?? "bg-zinc-100 text-zinc-700"}`}>
              {post.category}
            </span>
            <span className="text-xs text-zinc-400">{post.readingTime} menit baca</span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-400">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-zinc-900 sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-zinc-500">{post.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-semibold text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
          </div>
        </div>

        {/* MDX content */}
        <article className="prose prose-zinc prose-sm sm:prose-base max-w-none rounded-3xl border border-zinc-200 bg-white px-6 py-8 sm:px-8 shadow-sm
          prose-headings:font-extrabold prose-headings:tracking-tight
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-zinc-700 prose-p:leading-relaxed
          prose-li:text-zinc-700
          prose-strong:text-zinc-900
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
          prose-hr:border-zinc-200">
          <Content />
        </article>

        {/* CTA */}
        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
          <p className="font-semibold text-zinc-900">Ada pertanyaan seputar peralatan olahraga?</p>
          <p className="mt-1 text-sm text-zinc-600">Konsultasi gratis dengan tim ProFabric Steel, kami siap bantu pilihkan produk yang sesuai kebutuhan kamu.</p>
          <a
            href={waUrl(`Halo admin PFS, saya baca artikel "${post.title}" dan ingin konsultasi`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
          >
            <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Konsultasi Sekarang
          </a>
        </div>

        {/* Back to blog */}
        <div className="mt-4 text-center">
          <Link href="/blog" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900">
            ← Kembali ke Blog
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
