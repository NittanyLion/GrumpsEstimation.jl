var documenterSearchIndex = {"docs":
[{"location":"objects/#User-Interface","page":"User interface","title":"User Interface","text":"","category":"section"},{"location":"objects/#Data-entry","page":"User interface","title":"Data entry","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"The methods below are used to enter data into Grumps.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"Sources()\nVariables()","category":"page"},{"location":"objects/#Grumps.Sources-Tuple{}","page":"User interface","title":"Grumps.Sources","text":"Sources( \n    T           = DefaultSourceTypes; \n    consumers   :: Any = nothing, \n    products    :: Any = nothing, \n    marketsizes :: Any = nothing, \n    draws       :: Any = nothing,\n    user        :: Any = nothing\n)\n\nCreates a GrumpsSources object with source type entries of type T where the entries are provided in the optional parameters.\n\nGrumps (potentially) uses four data sources: a data source for consumer-level data, one for product-level data, one for market size information, and one for demographic draws.  Only the product-level data are required, but are by themselves insufficient.  For instance, for BLP95 one needs information on products, market sizes, and demographics; for the Grumps estimator one needs all four types of data; for a multinomial logit both consumer and product information are needed.  Not all data are needed for all markets.  For instance, it is ok for some estimators for there to be consumer-level data in some markets but not others.\n\nThe T argument is mostly there to allow for future expansion, so the description below applies to the case in which T = DefaultSourceTypes.\n\nBy default, the entries can be nothing, a string, a DataFrame, or a SourceFileType.  If an entry is nothing, it means that no such data is to be used.  If an entry is a string then it is converted to a SourceFileCSV entry with comma delimiter where the string name is the file name.  To use other source file types, create a SourceFileType first.  A DataFrame can be passed, also.  In all cases other than nothing, data will eventually be (converted to) a DataFrame and parsed from that.\n\nThe consumers variable specifies where consumer-level data can be found, the products variable is for the product-level data, marketsizes is for market sizes, and draws is for demographic draws; user has not been implemented yet.\n\nUse the Variables method to specify the way the data sources are formatted and the specification to estimate.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.Variables-Tuple{}","page":"User interface","title":"Grumps.Variables","text":"function Variables( ; \n  market              :: Symbol = :market,\n  choice              :: Symbol = :choice,\n  interactions        :: Mat{Symbol} = [],\n  randomcoefficients  :: Vec{Symbol} = [],\n  outsidegood         :: String = \"outsidegood\",\n  share               :: Symbol = :share,\n  marketsize          :: Symbol = :N,\n  regressors          :: Vec{Symbol} = [],\n  instruments         :: Vec{Symbol} = [],\n  dummies             :: Vec{Symbol} = [],\n  nuisancedummy       :: Symbol = :none,\n  microinstruments    :: Mat{Symbol} = [],\n  user                :: Mat{Symbol} = []\n    )\n\nThis method creates an object of type GrumpsVariables.  It contains references to the variables that Grumps uses to create variables from the data sources specified by the call to the Sources function. \n\nFor instance, market is the column heading in the source spreadsheets for the market indicator.  This get's passed as a symbol, so the default (:market) says that the column heading is market, which is both case and spaces sensititve.  The same column heading  is used across all sources.  All entries with the exception of outsidegood refer to the column heading: outsidegood refers to the label used for the outside good, which should be the same across both spreadsheets and markets.\n\nmarket refers to the variable containing the market indicator in all input datasets\n\nproduct refers to the variable containing the product indicator in the product dataset\n\nchoice refers to the variable indicating the choice indicator in the consumer level datasets\n\ninteractions refers to the variables indicating consumer and product variable interactions (each row contains consumer variable, product variable)\n\nrandomcoefficients refers to the product level variables that have a random coefficient on them\n\noutsidegood refers to the label used for the outside good\n\nshare refers to the label used for the product level share\n\nmarketsize refers to the size of the market (number of people)\n\nregressors refers to the label used for the second stage regressors\n\ninstruments refers to the label used for the second stage instruments\n\ndummies refers to discrete variables to be converted to second stage dummy regressors and instruments\n\nnuisancedummy refers to at most one variable to be converted to a second stage dummy regressors and instrument whose coefficient value is of no interest\n\nmicroinstruments refers to micro instruments, which are only relevant for gmm style procedures\n\nuser refers to a list of variables to be added to the consumer-product interactions using a user-specified procedure\n\n\n\n\n\n","category":"method"},{"location":"objects/#Optimization-options","page":"User interface","title":"Optimization options","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"The default optimization options are sensible, in which case this section can be skipped.  But for those who want to play with tolerances and such, have at it.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"OptimizationOptions()\nOptimOptionsθ()\nOptimOptionsδ()","category":"page"},{"location":"objects/#Grumps.OptimizationOptions-Tuple{}","page":"User interface","title":"Grumps.OptimizationOptions","text":"OptimizationOptions(; \nθopt = OptimOptionsθ(), \nδopt = OptimOptionsδ(), \nthreads = GrumpsThreads(), \nmemsave = false, \nmaxrepeats = 4, \nprobtype = :fast )\n\nSets the options used for numerical optimization.  θopt is used for the external optimization routine, δopt for the internal one.  These are both of type OptimOptions; see the OptimOptionsθ and OptimOptionsδ methods for elaboration.  The memsave variable is set to false by default; turning it on will reduce memory consumption significantly, but will also slow down computation.  The variable maxrepeats may disappear in the  future.  \n\nFinally, there are two ways of computing choice probabilities: robust and fast, specified by passing :robust or :fast in probtype. Fast choice probabilities are the default for good reason.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.OptimOptionsθ-Tuple{}","page":"User interface","title":"Grumps.OptimOptionsθ","text":"OptimOptionsθ(; \nf_tol = 1.0e-8, \ng_tol = 1.0e-4, \nx_tol = 1.0e-5, \niterations = 25, \nshow_trace = true, \nstore_trace = true, \nextended_trace = true )\n\nCreates and returns an OptimOptions optimization options variable for the outer optimization algorithm, including the function value tolerance, the gradient tolerance, the solution tolerance, the maximum number of iterations, whether to show the trace, whether to store the trace, and whether to keep the extended trace.  See the Optim package for details.  \n\nThe current version of Grumps will largely ignore the trace-related parameters.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.OptimOptionsδ-Tuple{}","page":"User interface","title":"Grumps.OptimOptionsδ","text":"OptimOptionsδ( ; \nf_tol = 1.0e-8, \ng_tol = 1.0e-8, \nx_tol = 1.0e-6, \niterations = 25, \nshow_trace = false, \nstore_trace = true, \nextended_trace = false )\n\nCreates and returns an OptimOptions optimization options variable for the inner optimization algorithm, including the function value tolerance, the gradient tolerance, the solution tolerance, the maximum number of iterations, whether to show the trace, whether to store the trace, and whether to keep the extended trace.  See the Optim package for details.  \n\nThe current version of Grumps will largely ignore the trace-related parameters.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Data-storage-options","page":"User interface","title":"Data storage options","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"The default data storage options are sensible, but some space can be saved by tinkering with the settings.  However, the only parameter that is worth changing is σ2, which is the variance of ξ, the product level error term.  This is of no relevance for two-stage estimators like unpenalized mle.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"DataOptions()","category":"page"},{"location":"objects/#Grumps.DataOptions-Tuple{}","page":"User interface","title":"Grumps.DataOptions","text":"Dataoptions(; \n    micromode   = :Hog\n    macromode   = :Ant\n    balance     = :micro\n    σ2          = 1.0\n)\n\nSpecifies how Grumps should store its data and what it should store.  The first three options are best left alone, unless you know what it is you're doing.  The last option is the variance of ξ, i.e. the error variance in the product level moments.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Estimator-choice","page":"User interface","title":"Estimator choice","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"Grumps can compute quite a few estimators and one can specify which estimator to use by passing the return value of a call to Estimator to the optimization routine.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"The easiest way to call Estimator is by passing it a string that describes what it is that you want to do.  The following estimators are currently defined:","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"the full Grumps estimator\nGrumps-style maximum likelihood, i.e Grumps without penalty\nditto, but imposing share constraints\nGMM estimator that uses both micro and macro moments and uses quadrature instead of Monte Carlo draws in the micro moments.  The micro moments are `smart' in that they condition on z_im instead of integrating it out.\na mixed logit estimator","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"Estimator( s :: String )\nEstimator( s :: Symbol )\nEstimators()","category":"page"},{"location":"objects/#Grumps.Estimator-Tuple{String}","page":"User interface","title":"Grumps.Estimator","text":"Estimator( s :: String )\n\nCreates and returns a GrumpsEstimator type.  Grumps is reasonably good at figuring out what it is that you want, so e.g. Estimator( \"maximum likelihood\" ) gives you the unpenalized Grumps maximum likelihood estimator.\n\nThe estimators currently programmed include:\n\nthe full Grumps estimator\nGrumps-style maximum likelihood, i.e Grumps without penalty\nditto, but imposing share constraints\nGMM estimator that uses both micro and macro moments and uses quadrature instead of Monte Carlo draws in the micro moments.  The micro moments are `smart' in that they condition on z_im instead of integrating it out.\na mixed logit estimator\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.Estimator-Tuple{Symbol}","page":"User interface","title":"Grumps.Estimator","text":"Estimator( s :: Symbol )\n\nCreates and returns a GrumpsEstimator type.\n\nThis is one method of specifying the estimator used.  However, it is unforgiving in that the exact symbol used internally must be passed, so the Estimator( s :: String ) method is usually a better choice.\n\nPossible choices include:\n\n:pml the full Grumps maximum likelihood estimator  \n\n:vanilla the unpenalized Grumps maximum likelihood estimator\n\n:shareconstraint the unpenalized Grumps maximum likelihood estimator with share constraints\n\n:gmm GMM estimator that uses both micro and macro moments\n\n:mixedlogit mixed logit maximum likelihood estimator\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.Estimators-Tuple{}","page":"User interface","title":"Grumps.Estimators","text":"Estimators( )\n\nPrints a list of available estimators.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Choice-of-integration-method-(samplers)","page":"User interface","title":"Choice of integration method (samplers)","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"Grumps uses separate integration methods for the micro and macro components. The default choices are simple with small numbers of nodes and draws. For micro, it is Hermitian quadrature, for macro it's Monte Carlo draws. One gets the defaults if the choices are omitted.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"The procedure is to create the samplers using a call to BothSamplers with the desired samplers as arguments and then pass this in your call to GrumpsData.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"BothSamplers( :: MicroSampler{T}, ::MacroSampler{T} ) where {T<:AbstractFloat}\nDefaultMicroSampler( ::Int, ::Type )\nDefaultMacroSampler( ::Int, ::Type )","category":"page"},{"location":"objects/#Grumps.BothSamplers-Union{Tuple{T}, Tuple{MicroSampler{T}, MacroSampler{T}}} where T<:AbstractFloat","page":"User interface","title":"Grumps.BothSamplers","text":"BothSamplers( microsampler :: MicroSampler{T}, macrosampler :: MacroSampler{T} )\n\nCreates the type BothSamplers containing both the indicated microsampler and macrosampler.  \n\nEither argument can be omitted.  If both arguments are omitted then one can pass the floating point type T instead.  If no floating point type is passed then a Float64 is assumed.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.DefaultMicroSampler-Tuple{Int64, Type}","page":"User interface","title":"Grumps.DefaultMicroSampler","text":"DefaultMicroSampler( n :: Int, T :: Type )\n\nCreates a basic quadrature sampler using n nodes in each dimension.  Type T can be omitted, in which case it is Float64.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.DefaultMacroSampler-Tuple{Int64, Type}","page":"User interface","title":"Grumps.DefaultMacroSampler","text":"DefaultMacroSampler( n :: Int, T :: Type )\n\nCreates a basic Monte Carlo sampler using n draws.  Type T can be omitted, in which case it is Float64.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Data-object-creation","page":"User interface","title":"Data object creation","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"The data stored in spreadsheets or other objects have to be converted into a form that Grumps understands.  The call to Data achieves that.   It takes as inputs the various choices made by the user and then creates an appropriate data object that is subsequently passed to the optimization call.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"Data()","category":"page"},{"location":"objects/#Grumps.Data-Tuple{}","page":"User interface","title":"Grumps.Data","text":"Data( \n    e                   :: GrumpsEstimator,\n    ss                  :: Sources,\n    v                   :: Variables,\n    samplers            :: GrumpsSamplers = BothSamplers(),\n    T                   :: Type = F64,\n    u                   :: UserEnhancement = DefaultUserEnhancement();\n    options             :: DataOptions = GrumpsDataOptions()\n    )\n\nTakes user inputs and converts them into an object that Grumps can understand.  This is synonymous with GrumpsData(...).\n\nData takes the following arguments, of which the first three are mandatory:\n\ne:                   estimator; see Estimator\nss:                  cata sources; see Sources\nv:                   variables to be used; see Variables\nsamplers:            see BothSamplers, DefaultMicroSampler, and DefaultMacroSampler\nT:                   floating point type; not heavily tested\nu:                   not yet implemented\noptions:             data options to be used, see DataOptions\n\n\n\n\n\n","category":"method"},{"location":"objects/#Algorithm-call","page":"User interface","title":"Algorithm call","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"Once all data structures have been put together, one can call the algorithm.  This is straightforward.","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"    grumps( ::Estimator, ::Data{T}, ::OptimizationOptions, ::Grumps.StartingVector{T}, ::StandardErrorOptions ) where {T<:Grumps.Flt}","category":"page"},{"location":"objects/#Grumps.grumps-Union{Tuple{T}, Tuple{Estimator, Data{T}, OptimizationOptions, Union{Nothing, Vector{T}}, StandardErrorOptions}} where T<:AbstractFloat","page":"User interface","title":"Grumps.grumps","text":"grumps( \n    e       :: Estimator,\n    d       :: Data{T},\n    o       :: OptimizationOptions = OptimizationOptions(),\n    θstart  :: StartingVector{T} = nothing,\n    seo     :: StandardErrorOptions = StandardErrorOptions()\n)\n\nConducts the optimization.  You typically just want to set θstart to nothing, i.e. have a starting vector  picked automatically.  \n\n\n\n\n\n","category":"method"},{"location":"objects/#Retrieving-results","page":"User interface","title":"Retrieving results","text":"","category":"section"},{"location":"objects/","page":"User interface","title":"User interface","text":"As noted above, Grumps will return its results in a GrumpsSolution variable that can be queried as follows.  to be expanded","category":"page"},{"location":"objects/","page":"User interface","title":"User interface","text":"getθ( sol :: GrumpsSolution )\ngetδ( sol :: GrumpsSolution )\ngetβ( sol :: GrumpsSolution )\ngetcoef( e :: GrumpsEstimate )\ngetstde( e :: GrumpsEstimate )\ngettstat( e :: GrumpsEstimate )\ngetname( e :: GrumpsEstimate )","category":"page"},{"location":"objects/#Grumps.getθ-Tuple{GrumpsSolution}","page":"User interface","title":"Grumps.getθ","text":"getθ( sol :: GrumpsSolution )\n\nReturns a vector of GrumpsEstimate types for θ that can be queried for results.  See  getcoef, getstde, gettstat, and getname.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.getδ-Tuple{GrumpsSolution}","page":"User interface","title":"Grumps.getδ","text":"getδ( sol :: GrumpsSolution )\n\nReturns a vector of GrumpsEstimate types for δ that can be queried for results. See  getcoef, getstde, gettstat, and getname.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.getβ-Tuple{GrumpsSolution}","page":"User interface","title":"Grumps.getβ","text":"getβ( sol :: GrumpsSolution )\n\nReturns a vector of GrumpsEstimate types for β that can be queried for results. See  getcoef, getstde, gettstat, and getname.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.getcoef-Tuple{GrumpsEstimate}","page":"User interface","title":"Grumps.getcoef","text":"getcoef( e :: GrumpsEstimate )\n\nReturns the estimated coefficient value.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.getstde-Tuple{GrumpsEstimate}","page":"User interface","title":"Grumps.getstde","text":"getstde( e :: GrumpsEstimate )\n\nReturns the standard error.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.gettstat-Tuple{GrumpsEstimate}","page":"User interface","title":"Grumps.gettstat","text":"gettstat( e :: GrumpsEstimate )\n\nReturns the t statistic.\n\n\n\n\n\n","category":"method"},{"location":"objects/#Grumps.getname-Tuple{GrumpsEstimate}","page":"User interface","title":"Grumps.getname","text":"getname( e :: GrumpsEstimate )\n\nReturns the variable name.\n\n\n\n\n\n","category":"method"},{"location":"extending/#Extending-Grumps","page":"Extending Grumps","title":"Extending Grumps","text":"","category":"section"},{"location":"extending/","page":"Extending Grumps","title":"Extending Grumps","text":"to be done","category":"page"},{"location":"quickstart/#Quick-Start-Guide","page":"Quick start","title":"Quick Start Guide","text":"","category":"section"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"To use Grumps.jl consider the following program, which computes the unpenalized maximum likelihood estimator of Grieco, Murry, Pinkse, and Sagl.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"using Grumps, LinearAlgebra\n\nGrumps.@Imports()\n\nBLAS.set_num_threads(8)\n\nfunction myprogram(  )\n\n    @info \"setting source files\"\n    s = Sources(\n    consumers = \"_example_consumers.csv\",\n    products = \"_example_products.csv\",\n    marketsizes = \"_example_marketsizes.csv\",\n    draws = \"_example_draws.csv\"  \n    )\n    println( s )\n\n     v = Variables(\n        interactions =  [\n            :income :constant; \n            :income :ibu; \n            :age :ibu\n            ],\n        randomcoefficients =  [:ibu; :abv],\n        regressors =  [ :constant; :ibu; :abv ],\n        instruments = [ :constant; :ibu; :abv; :IVgh_ibu; :IVgh_abv ],\n        outsidegood = \"outside\"\n    )\n    println( v )\n\n    e = Estimator( \"pml\" )\n\n    d = Data( e, s, v )\n\n     sol = grumps( e, d )\n\n     println( sol )\nend\n\nmyprogram()","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"To see what is happening in the code, note the following commands.  Grumps.@Imports() simply imports some common Grumps commands into your namespace.  It is not necessary; without it you would simply have to type e.g. Grumps.Variables instead of Variables.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"Now consider the function myprogram.  It first describes where data on consumers, products, market sizes, and random draws can be found.  This happens in the Sources call. In this example, all sources are files, but DataFrames are ok, also.  In addition, not all sources are needed for all estimators and options.  Indeed, only products data are required.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"Next, in Variables it describes what variables to include.  In this case, there are three interactions between demographic characteristics (in the first column) and product characteristics (in the second column).  There are moreover random coefficients on the ibu and abv variables.  The product-level regressors and instruments that go into hat Pi are also entered.  Finally, the outsidegood argument indicates which value in the consumers spreadsheet is used to indicate that a product is the outside good.  ***should enter other variables, like product and market***","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"It then tells Grumps that it wants to use the full Grumps maximum likelihood estimator with penalized deviations from the macro moments in Estimator.  You could also have entered another descriptive string; Grumps is pretty good at figuring out what you want.  Or you can use a symbol, like :mle.  In the Data call, it reads the data needed from the sources indicated in the Sources call using the information specified in the Variables call.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"The grumps call then asks Grumps to compute the estimates.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"Note that there are many other options and calls.  The main ones are described in the Objects tab.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"To get help on a command, simply load Grumps in the REPL and type e.g.","category":"page"},{"location":"quickstart/","page":"Quick start","title":"Quick start","text":"julia> ?Variables","category":"page"},{"location":"spreadsheet/#Spreadsheet-formats","page":"Spreadsheet format","title":"Spreadsheet formats","text":"","category":"section"},{"location":"flow/#Algorithm-flow","page":"Algorithm flow","title":"Algorithm flow","text":"","category":"section"},{"location":"flow/","page":"Algorithm flow","title":"Algorithm flow","text":"When Grumps is called using the grumps function, it runs est.jl in the optim folder.  This sets up various objects and then calls an optimizer with an objective function that is estimator-specific.  In other words, it will call a different method depending on the e argument in ObjectiveFunctionθ! in est.jl in the optim folder.","category":"page"},{"location":"flow/","page":"Algorithm flow","title":"Algorithm flow","text":"These methods ObjectiveFunctionθ! are defined either in one of the julia files in the optim folder whose name starts with obj, or in a specific estimator folder.  ObjectiveFunctionθ! then decides which internal optimizer (i.e. one that finds δ) to call: they're all called grumpsδ!.","category":"page"},{"location":"structure/#Directory-structure","page":"Directory structure","title":"Directory structure","text":"","category":"section"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"There are really two folders with sources:","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"src for the programs\ndocs for the documentation","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"Within src you will find the main package file Grumps.jl and includes.jl, which loads all source code.","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"Beyond that, you will find several folders:","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"packages: loads all packages\ncommon: loads code that is common to several estimators\ncode that is specific to one estimator, one folder per estimator","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"If you want to see how a particular data type is defined, just check out the types folder.  Since there are many types and subtypes, it can be handy to type GrumpsTypes() to get a list of some of the major ones.","category":"page"},{"location":"structure/","page":"Directory structure","title":"Directory structure","text":"If you wish to learn more about the algorithm itself, head to the optim folder.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: header)","category":"page"},{"location":"#Grumps.jl","page":"Home","title":"Grumps.jl","text":"","category":"section"},{"location":"#Estimators-covered","page":"Home","title":"Estimators covered","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Grumps.jl is a package for computing random coefficients demand models, including:","category":"page"},{"location":"","page":"Home","title":"Home","text":"the penalized likelihood estimator of Grieco, Murry, Pinkse, and Sagl (2022)\nthe unpenalized likelihood estimator of Grieco, Murry, Pinkse, and Sagl (2022)\nGMM type random coefficient models in the style of Berry, Levinsohn, and Pakes (2004)\nGMM type random coefficient models in the style of Berry, Levinsohn, and Pakes (1995)\nMixed logit models\nMultinomial logit models","category":"page"},{"location":"","page":"Home","title":"Home","text":"It can handle problems of the form","category":"page"},{"location":"","page":"Home","title":"Home","text":"(hatdeltahatthetahatbeta) = argmin_deltathetabeta big( - log hat L(deltatheta) + hatPi(deltabeta) big)","category":"page"},{"location":"","page":"Home","title":"Home","text":"where log hat L is the sum of a micro loglikelihood and a macro loglikelihood and hatPi is a quadratic penalty term.  Any of the three components can be omitted if so desired. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Typically, log hat L is a sum over markets, products, and consumers whereas hatPi is a GMM-style squared norm of a vector-valued sum over markets.  Please see Grieco, Murry, Pinkse, and Sagl (2022) for details.","category":"page"},{"location":"example/#Example-program","page":"Example program","title":"Example program","text":"","category":"section"}]
}
