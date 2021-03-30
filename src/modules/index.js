import loadable from '@loadable/component'




const TwoBoxContent = loadable(() => import('./2BoxContent'))
const BestofBothWorldsModule = loadable(() => import('./BestofBothWorldsModule'))
const CTABlocks = loadable(() => import("./CTABlocks"))
const Callout = loadable(() => import("./Callout"))
const CaseStudyContentPanel = loadable(() => import("./CaseStudyContentPanel"))
const CaseStudyDetails = loadable(() => import("./CaseStudyDetails"))
const CaseStudyListing = loadable(() => import("./CaseStudyListing"))
const CaseStudyRotator = loadable(() => import("./CaseStudyRotator"))
const CaseStudyTechStack = loadable(() => import("./CaseStudyTechStack"))
const CenteredContentPanel = loadable(() => import("./CenteredContentPanel"))
const CenteredCTAPanel = loadable(() => import("./CenteredCTAPanel"))
const ContentPanel = loadable(() => import("./ContentPanel"))
const ContentPanelForm = loadable(() => import("./ContentPanelForm"))
const EventDetails = loadable(() => import("./EventDetails"))
const EventListing = loadable(() => import("./EventListing"))
const Faqs = loadable(() => import("./Faqs"))
const FeatureBlocks = loadable(() => import("./FeatureBlocks"))
const FeatureBlocksWithText = loadable(() => import("./FeatureBlocksWithText"))
const FeatureComparisonChart = loadable(() => import("./FeatureComparisonChart"))
const FeatureList = loadable(() => import("./FeatureList"))
const FeatureListing = loadable(() => import("./FeatureListing"))
const FeaturedCaseStudies = loadable(() => import("./FeaturedCaseStudies"))
const FeaturedPlanCTA = loadable(() => import("./FeaturedPlanCTA"))
const FeaturedResources = loadable(() => import("./FeaturedResources"))
const G2CrowdReviewListing = loadable(() => import("./G2CrowdReviewListing"))
const GartnerPeerInsightsBar = loadable(() => import("./GartnerPeerInsightsBar"))
const GatedDownload = loadable(() => import("./GatedDownload"))
const GettingStarted = loadable(() => import("./GettingStarted"))
const GuideLinks = loadable(() => import("./GuideLinks"))
const InfoBox = loadable(() => import("./InfoBox"))
const JobListing = loadable(() => import("./JobListing"))
const LandingPageHeader = loadable(() => import("./LandingPageHeader"))
const LandingPageHeaderForm = loadable(() => import("./LandingPageHeaderForm"))
const LatestPosts = loadable(() => import("./LatestPosts"))
const LatestResources = loadable(() => import("./LatestResources"))
const LogoListing = loadable(() => import("./LogoListing"))
const LogoListingModule = loadable(() => import("./LogoListingModule"))

const MostViewedArticles = loadable(() => import("./MostViewedArticles"))
const NewIntegrationModule = loadable(() => import("./NewIntegrationModule"))
const PartnerContentPanel = loadable(() => import("./PartnerContentPanel"))
const PartnerDetails = loadable(() => import("./PartnerDetails"))
const PartnerListing = loadable(() => import("./PartnerListing"))
const PartnerLogoListing = loadable(() => import("./PartnerLogoListing"))
const PeopleListing = loadable(() => import("./PeopleListing"))
const PlanDetailsTable = loadable(() => import("./PlanDetailsTable"))
const PlanFeaturesCTA = loadable(() => import("./PlanFeaturesCTA"))
const PodcastContentPanel = loadable(() => import("./PodcastContentPanel"))
const PodcastDetail = loadable(() => import("./PodcastDetail"))
const PodcastListing = loadable(() => import("./PodcastListing"))

const PostDetails = loadable(() => import("./PostDetails"))
const PostListing = loadable(() => import("./PostListing"))
const PricingPackagesModule = loadable(() => import("./PricingPackagesModule"))
const PricingPlans = loadable(() => import("./PricingPlans"))
const PricingTable = loadable(() => import("./PricingTable"))
const ResourceDetails = loadable(() => import("./ResourceDetails"))
const ReviewRotator = loadable(() => import("./ReviewRotator"))
const RichTextArea = loadable(() => import("./RichTextArea"))
const RightLeftContent = loadable(() => import("./RightLeftContent"))
const RightORLeftContentModule = loadable(() => import("./RightORLeftContentModule"))
const RightOrLeftCaseStudyTestimonial = loadable(() => import("./RightOrLeftCaseStudyTestimonial"))
const RightOrLeftSteps = loadable(() => import("./RightOrLeftSteps"))
const SearchResults = loadable(() => import("./SearchResults"))
const SectionBreadcrumbModule = loadable(() => import("./SectionBreadcrumbModule"))
const Share = loadable(() => import("./Share"))
const SingleTestimonialPanel = loadable(() => import("./SingleTestimonialPanel"))
const Spacing = loadable(() => import("./Spacing"))
const StarterTemplateDetails = loadable(() => import("./StarterTemplateDetails"))
const StarterTemplateListing = loadable(() => import("./StarterTemplateListing"))
const StayInTouch = loadable(() => import("./StayInTouch"))
const SubmissionForm = loadable(() => import("./SubmissionForm"))
const SubscribedThankYou = loadable(() => import("./SubscribedThankYou"))
const TabPanels = loadable(() => import("./TabPanels"))
const TestDrive = loadable(() => import("./TestDrive"))
const Testimonials = loadable(() => import("./Testimonials"))
const TestimonialsLogos = loadable(() => import("./TestimonialsLogos"))
const TriplePanelComparisonModule = loadable(() => import("./TriplePanelComparisonModule"))
const TriplePanelModule = loadable(() => import("./TriplePanelModule"))
const TwoPanelFeatureComparison = loadable(() => import("./TwoPanelFeatureComparison"))
const VerticalContentPanel = loadable(() => import("./VerticalContentPanel"))
const VideoPlayerModule = loadable(() => import("./VideoPlayerModule"))


const allModules = {
	"2BoxContent": TwoBoxContent,
	"BestofBothWorldsModule": BestofBothWorldsModule,
	"CTABlocks": CTABlocks,
	"Callout": Callout,
	"CaseStudyContentPanel": CaseStudyContentPanel,
	"CaseStudyDetails": CaseStudyDetails,
	"CaseStudyListing": CaseStudyListing,
	"CaseStudyRotator": CaseStudyRotator,
	"CaseStudyTechStack": CaseStudyTechStack,
	"CenteredContentPanel": CenteredContentPanel,
	"CenteredCTAPanel": CenteredCTAPanel,
	"ContentPanel": ContentPanel,
	"ContentPanelForm": ContentPanelForm,
	"EventDetails": EventDetails,
	"EventListing": EventListing,
	"Faqs": Faqs,
	"FeatureBlocks": FeatureBlocks,
	"FeatureBlocksWithText": FeatureBlocksWithText,
	"FeatureComparisonChart": FeatureComparisonChart,
	"FeatureList": FeatureList,
	"FeatureListing": FeatureListing,
	"FeaturedCaseStudies": FeaturedCaseStudies,
	"FeaturedPlanCTA": FeaturedPlanCTA,
	"FeaturedResources": FeaturedResources,
	"G2CrowdReviewListing": G2CrowdReviewListing,
	"GartnerPeerInsightsBar": GartnerPeerInsightsBar,
	"GatedDownload": GatedDownload,
	"GettingStarted": GettingStarted,
	"GuideLinks": GuideLinks,
	"InfoBox": InfoBox,
	"JobListing": JobListing,
	"LandingPageHeader": LandingPageHeader,
	"LandingPageHeaderForm": LandingPageHeaderForm,
	"LatestPosts": LatestPosts,
	"LatestResources": LatestResources,
	"LogoListing": LogoListing,
	"LogoListingModule": LogoListingModule,
	"MostViewedArticles": MostViewedArticles,
	"NewIntegrationModule": NewIntegrationModule,
	"PartnerContentPanel": PartnerContentPanel,
	"PartnerDetails": PartnerDetails,
	"PartnerListing": PartnerListing,
	"PartnerLogoListing": PartnerLogoListing,
	"PeopleListing": PeopleListing,
	"PlanDetailsTable": PlanDetailsTable,
	"PlanFeaturesCTA": PlanFeaturesCTA,
	"PodcastContentPanel": PodcastContentPanel,
	"PodcastDetail": PodcastDetail,
	"PodcastListing": PodcastListing,
	"PostListing": PostListing,
	"PostDetails": PostDetails,
	"PricingPackagesModule": PricingPackagesModule,
	"PricingPlans": PricingPlans,
	"PricingTable": PricingTable,
	"ResourceDetails": ResourceDetails,
	"ReviewRotator": ReviewRotator,

	"RichTextArea": RichTextArea,

	"RightLeftContent": RightLeftContent,
	"RightORLeftContentModule": RightORLeftContentModule,
	"RightOrLeftCaseStudyTestimonial": RightOrLeftCaseStudyTestimonial,
	"RightOrLeftSteps": RightOrLeftSteps,
	"SearchResults": SearchResults,
	"SectionBreadcrumbModule": SectionBreadcrumbModule,
	"Share": Share,
	"SingleTestimonialPanel": SingleTestimonialPanel,
	"Spacing": Spacing,
	"StarterTemplateDetails": StarterTemplateDetails,
	"StarterTemplateListing": StarterTemplateListing,
	"StayInTouch": StayInTouch,
	"SubmissionForm": SubmissionForm,
	"SubscribedThankYou": SubscribedThankYou,
	"TabPanels": TabPanels,
	"TestDrive": TestDrive,
	"Testimonials": Testimonials,
	"TestimonialsLogos": TestimonialsLogos,
	"TriplePanelComparisonModule": TriplePanelComparisonModule,
	"TriplePanelModule": TriplePanelModule,
	"TwoPanelFeatureComparison": TwoPanelFeatureComparison,
	"VerticalContentPanel": VerticalContentPanel,
	"VideoPlayerModule": VideoPlayerModule,


}

export const getModule = (name) => {
	return allModules[name]
}