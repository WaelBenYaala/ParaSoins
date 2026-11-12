package tn.parasoins.dto;

import java.util.List;

public class CommandeRequest {
    private Long clientId;
    private String nomClient;
    private String telephone;
    private String adresse;
    private String modePaiement;
    private List<PanierItemDto> articles;

    public static class PanierItemDto {
        private Long produitId;
        private Integer quantite;

        public Long getProduitId() { return produitId; }
        public void setProduitId(Long produitId) { this.produitId = produitId; }
        public Integer getQuantite() { return quantite; }
        public void setQuantite(Integer quantite) { this.quantite = quantite; }
    }

    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }
    public String getNomClient() { return nomClient; }
    public void setNomClient(String nomClient) { this.nomClient = nomClient; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public String getModePaiement() { return modePaiement; }
    public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }
    public List<PanierItemDto> getArticles() { return articles; }
    public void setArticles(List<PanierItemDto> articles) { this.articles = articles; }
}
