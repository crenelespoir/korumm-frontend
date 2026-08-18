export type EventType = 'GRATUIT' | 'PAYANT';

export interface Event {
    id: string;
    titre: string;
    description: string;
    lieu: string;
    dateEvenement: string;
    image: string | null;
    nombrePlaces: number;
    type: EventType;
    prix: string | null;
    organisateurId: string;
    createdAt: string;
    updatedAt: string;
}