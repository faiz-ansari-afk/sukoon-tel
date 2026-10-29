export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';
type AnyExtractor = any;
declare class EmbeddingModelManager {
    private static instance;
    private extractor;
    private status;
    private loadingPromise;
    private errorMessage;
    private statusListeners;
    private constructor();
    static getInstance(): EmbeddingModelManager;
    getStatus(): ModelStatus;
    getErrorMessage(): string | null;
    onStatusChange(callback: (status: ModelStatus) => void): () => void;
    private setStatus;
    getExtractor(): Promise<AnyExtractor>;
    /**
     * Generates a 384-dimensional normalized vector embedding for the query.
     */
    embedQuery(query: string): Promise<number[]>;
}
export declare const embeddingModelManager: EmbeddingModelManager;
export {};
