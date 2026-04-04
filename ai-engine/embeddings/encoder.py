"""
Embeddings Module
Handles text embedding generation for semantic similarity matching.
"""

from typing import List
import numpy as np


class TextEncoder:
    """Encode text into embeddings for similarity comparison."""

    def __init__(self):
        self._model = None

    def _load_model(self):
        """Lazy-load the sentence transformer model."""
        if self._model is None:
            try:
                from sentence_transformers import SentenceTransformer
                self._model = SentenceTransformer("all-MiniLM-L6-v2")
            except ImportError:
                print("⚠️ sentence-transformers not installed. Using fallback encoder.")
                self._model = "fallback"

    def encode(self, texts: List[str]) -> np.ndarray:
        """Encode a list of texts into embedding vectors."""
        self._load_model()

        if self._model == "fallback":
            return self._fallback_encode(texts)

        return self._model.encode(texts, normalize_embeddings=True)

    def similarity(self, text1: str, text2: str) -> float:
        """Calculate cosine similarity between two texts."""
        embeddings = self.encode([text1, text2])
        return float(np.dot(embeddings[0], embeddings[1]))

    def batch_similarity(self, query: str, candidates: List[str]) -> List[float]:
        """Calculate similarity scores between query and multiple candidates."""
        all_texts = [query] + candidates
        embeddings = self.encode(all_texts)
        query_embedding = embeddings[0]
        candidate_embeddings = embeddings[1:]

        scores = [
            float(np.dot(query_embedding, emb))
            for emb in candidate_embeddings
        ]
        return scores

    def _fallback_encode(self, texts: List[str]) -> np.ndarray:
        """Simple word-frequency-based encoding fallback."""
        vocab = set()
        for text in texts:
            vocab.update(text.lower().split())
        vocab = sorted(vocab)
        vocab_index = {w: i for i, w in enumerate(vocab)}

        embeddings = np.zeros((len(texts), len(vocab)))
        for i, text in enumerate(texts):
            for word in text.lower().split():
                if word in vocab_index:
                    embeddings[i][vocab_index[word]] += 1

        # Normalize
        norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
        norms[norms == 0] = 1
        return embeddings / norms
