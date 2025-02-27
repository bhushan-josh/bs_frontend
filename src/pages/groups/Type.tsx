export interface Group {
    "id": number
    "name": string,
    "creator_id": string,
    "description": string
}

export interface GroupDisplayProps {
    group: Group[];  
    error: string | null;
  }