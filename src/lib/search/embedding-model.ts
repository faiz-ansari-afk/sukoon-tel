// Browser-compatible local embedding extractor manager
const MODEL_NAME = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyExtractor = any;

class EmbeddingModelManager {
  private static instance: EmbeddingModelManager;
  private extractor: AnyExtractor = null;
  private status: ModelStatus = 'idle';
  private loadingPromise: Promise<AnyExtractor> | null = null;
  private errorMessage: string | null = null;
  private statusListeners: Array<(status: ModelStatus) => void> = [];

  private constructor() {}

  public static getInstance(): EmbeddingModelManager {
    if (!EmbeddingModelManager.instance) {
      EmbeddingModelManager.instance = new EmbeddingModelManager();
    }
    return EmbeddingModelManager.instance;
  }

  public getStatus(): ModelStatus {
    return this.status;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public onStatusChange(callback: (status: ModelStatus) => void): () => void {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter((cb) => cb !== callback);
    };
  }

  private setStatus(status: ModelStatus, error: string | null = null) {
    this.status = status;
    this.errorMessage = error;
    this.statusListeners.forEach((cb) => cb(status));
  }

  public async getExtractor(): Promise<AnyExtractor> {
    if (this.extractor) {
      return this.extractor;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.setStatus('loading');

    this.loadingPromise = (async () => {
      try {
        const { pipeline, env } = await import('@xenova/transformers');

        if (typeof window !== 'undefined') {
          env.allowLocalModels = false;
          env.useBrowserCache = true;
        }

        const extractor = await pipeline('feature-extraction', MODEL_NAME, {
          quantized: true,
        });

        this.extractor = extractor;
        this.setStatus('ready');
        return extractor;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load embedding model';
        console.error('Vector Search Model loading error:', err);
        this.setStatus('error', message);
        this.loadingPromise = null;
        throw err;
      }
    })();

    return this.loadingPromise;
  }

  /**
   * Generates a 384-dimensional normalized vector embedding for the query.
   */
  public async embedQuery(query: string): Promise<number[]> {
    const extractor = await this.getExtractor();
    const output = await extractor(query, {
      pooling: 'mean',
      normalize: true,
    });

    return Array.from(output.data as Float32Array);
  }
}

export const embeddingModelManager = EmbeddingModelManager.getInstance();
