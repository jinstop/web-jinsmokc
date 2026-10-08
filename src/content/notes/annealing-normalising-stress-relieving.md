---
title: "Annealing, Normalising and Stress Relieving: What Each One Is For"
description: "Three processes that get confused with each other constantly. What each does to the microstructure, how they differ, and how to specify them."
slug: "annealing-normalising-stress-relieving"
date: 2026-09-24
tags: ["Annealing", "Metallurgy", "Basics"]
featured: false
draft: false
---
### Three words, three different jobs

These three are often used interchangeably in conversation and in purchase orders. They are not the same process, and getting them wrong wastes a furnace cycle and possibly a customer order.

**Annealing** — softens the material and refines the grain. Used where the part needs to be machinable, formable or ductile afterwards, or where internal stress must be removed before further processing.

**Normalising** — refines the grain and produces a uniform structure without going fully soft. Used where strength and toughness both matter, and where a consistent structure is needed before the next operation.

**Stress relieving** — does not deliberately change the microstructure. Heats below the transformation temperature so that residual stress relaxes while the structure stays as it is. Used after welding, machining or cold working, to stop parts distorting later.

### Annealing

The slow one. Annealing heats the material into the appropriate range, holds, and cools slowly — usually in the furnace.

Slow cooling allows the structure to relax and, depending on the process route, carbides to form a coarser distribution. The result is a softer, more workable material.

Common uses: making cold-rolled or cast parts machinable, relieving stress in welded fabrications before finishing, and preparing for operations like bending or forming.

Annealing is slow by design. **The cooling rate is the process**, not an energy saving measure. Shortening it by opening the door or pulling the load early produces a different structure and a different hardness — which is how "annealed" parts end up failing hardness checks.

### Normalising

Heating to a temperature above the transformation point, then cooling faster than annealing — usually still in air.

The faster cooling gives a finer grain than annealing. Finer grain means a better combination of strength and toughness than fully annealed material, with better machinability than as-cast.

It is a compromise, and that is why it is used so widely: it delivers a predictable, uniform structure at a fraction of the cycle time of a full anneal.

Normalising is also used as a **pre-treatment before carburising or nitriding** — you want a known, fine starting structure before the surface layer is built up.

### Stress relieving

Heating below the transformation temperature, holding, and cooling. Nothing structural is meant to change.

The purpose is to relieve residual stress introduced by welding, machining, forming or casting. Left in place, that stress drives distortion — parts move after they are machined, holes drift, flat plates warp — and it reduces fatigue life.

The temperature window matters. **Too high and you have effectively annealed the part.** The upper limit of stress relief is set by the material and the tempering temperature of any earlier heat treatment. For many steels it sits comfortably below the lower critical temperature; for some alloys it is close to it.

If parts are stress relieved before machining, the operation also needs a final stress relief after machining, because machining cuts new stresses.

### How to write the specification

A purchase requirement that says just "anneal" is incomplete. It should state:

- The material and grade
- The target hardness or tensile range, or the microstructure requirement
- The delivery condition

If the customer specifies a hardness range, that is the most reliable way to state the requirement, because it is measurable and it is what will be checked.

For stress relief, specify the **stress relief temperature and the hold**, and state whether it is before or after machining. State the dimensional acceptance criterion — how much movement is acceptable — because that is the acceptance test for the operation itself.

### Choosing between them

| Requirement | Process |
|---|---|
| Part must be soft and machinable | Annealing |
| Uniform structure, strength and toughness | Normalising |
| Welded or machined part is distorting | Stress relieving |
| Preparing for carburising or nitriding | Normalising |
| Relieving stress without changing properties | Stress relieving |
| Reducing hardness before a forming operation | Annealing |

If you are unsure which the part actually needs, a hardness check on the incoming material and a note of what failed last time will usually settle it faster than any specification discussion.

At the enquiry stage, tell us what the part is and what it has to do next. That is the information we need to recommend a process and size a furnace for it.
