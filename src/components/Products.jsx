import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/client';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [category, setCategory] = useState('');

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError(null);
		getProducts(category ? { category } : {})
			.then((data) => {
				if (!isMounted) return;
				setProducts(Array.isArray(data) ? data : []);
			})
			.catch((err) => {
				if (!isMounted) return;
				setError(err.message || 'Failed to load products');
			})
			.finally(() => {
				if (!isMounted) return;
				setLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [category]);

	return (
		<div className="products-page container">
			<div className="section-header">
				<div className="section-badge"><span data-vi="Sản phẩm" data-en="Products">Products</span></div>
				<h2 data-vi="Danh sách sản phẩm" data-en="Product Catalog">Product Catalog</h2>
			</div>

			<div className="products-filters" style={{ marginBottom: '16px', display: 'flex', gap: 12, alignItems: 'center' }}>
				<label htmlFor="category" style={{ fontWeight: 600 }}>Category:</label>
				<input
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					placeholder="e.g. 3d-animation"
					style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #333', background: 'transparent', color: 'inherit' }}
				/>
				<button className="btn btn-secondary" onClick={() => setCategory('')}>Clear</button>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p style={{ color: 'salmon' }}>{error}</p>}

			{!loading && !error && (
				<div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
					{products.map((p) => (
						<div key={p.id} className="product-card">
							<div className="product-media" style={{ aspectRatio: '16 / 9', background: '#0f0f0f', borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								{p.image ? (
									<img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
								) : (
									<div style={{ color: '#777' }}>No image</div>
								)}
							</div>
							<div className="product-content" style={{ padding: 12 }}>
								<h3 style={{ margin: 0 }}>{p.nameVi || p.name}</h3>
								<p style={{ margin: '8px 0', color: '#aaa' }}>{p.descriptionVi || p.description}</p>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
									<span className="badge" style={{ border: '1px solid #333', borderRadius: 999, padding: '4px 10px', fontSize: 12 }}>{p.category}</span>
									<span className="badge" style={{ border: '1px solid #333', borderRadius: 999, padding: '4px 10px', fontSize: 12 }}>{p.priceType === 'custom' ? 'Custom Price' : `$${p.price}`}</span>
								</div>
								{Array.isArray(p.features) && p.features.length > 0 && (
									<ul style={{ marginTop: 10, paddingLeft: 18 }}>
										{p.features.slice(0, 4).map((f, idx) => (
											<li key={idx} style={{ color: '#bbb' }}>{f}</li>
										))}
									</ul>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Products;





