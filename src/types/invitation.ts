export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PartyDetails {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCode?: string;
  rsvpDeadline?: string;
}

export interface RSVPResponse {
  name: string;
  email: string;
  attending: boolean;
  guests?: number;
  message?: string;
}

export interface InvitationState {
  isModalOpen: boolean;
  rsvpSubmitted: boolean;
  partyDetails: PartyDetails;
  setModalOpen: (open: boolean) => void;
  setRSVPSubmitted: (submitted: boolean) => void;
  setPartyDetails: (details: PartyDetails) => void;
} 