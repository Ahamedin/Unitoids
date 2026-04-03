import json
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# Load freelancers data
with open("data/freelancers.json", "r", encoding="utf-8") as f:
    freelancers = json.load(f)

docs = []

for f in freelancers:
    text = f"""
Name: {f['name']}
Category: {f['category']}
City: {f.get('city','N/A')}
Price: {f['price']}
Rating: {f.get('averageRating',0)}
Projects: {len(f.get('projects',[]))}
"""
    docs.append(text)

# Embeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Create FAISS DB
db = FAISS.from_texts(docs, embeddings)

# Save
db.save_local("vectorstore")

print("✅ Vectorstore created successfully")