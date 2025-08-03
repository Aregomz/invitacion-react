import { create } from 'zustand';
import type { InvitationState, PartyDetails } from '../types/invitation';

const defaultPartyDetails: PartyDetails = {
  title: "Estás Invitado a la Despedida",
  date: "2025-08-08",
  time: "20:00",
  location: "Avenida Alta luz 2001",
  description: "",
  dressCode: "",
  rsvpDeadline: "2025-08-05"
};

export const useInvitationStore = create<InvitationState>((set) => ({
  isModalOpen: false,
  rsvpSubmitted: false,
  partyDetails: defaultPartyDetails,
  setModalOpen: (open) => set({ isModalOpen: open }),
  setRSVPSubmitted: (submitted) => set({ rsvpSubmitted: submitted }),
  setPartyDetails: (details) => set({ partyDetails: details }),
})); 