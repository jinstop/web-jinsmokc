---
title: "Hardening and Tempering on a Continuous Line"
description: "Continuous hardening has specific constraints around austenitising time and transfer delay. What the line can and cannot do, and where a batch furnace still wins."
slug: "continuous-hardening-and-tempering"
date: 2026-09-03
tags: ["Hardening", "Tempering", "Quench"]
featured: false
draft: false
---
### The appeal of continuous hardening

Continuous hardening is attractive because throughput and consistency both improve. Every part gets the same austenitising temperature for the same duration, then the same transfer to quench. Consistency comes from repetition rather than from operator skill.

The constraint is that **the process must be tolerant of what a continuous line does**.

Two things happen on a continuous line that do not happen in a batch furnace: the part is held at austenitising temperature for whatever time the line geometry dictates, and it reaches the quench after a fixed, usually short, transfer delay.

If your steel or your geometry cannot tolerate those two conditions, continuous hardening is the wrong platform.

### Austenitising time is set by geometry

In a batch furnace, the operator sets the cycle and the soak. In a continuous furnace, dwell time is determined by **line speed and heated length**.

Working width, belt speed, part pitch and heating zone length together fix the time a part spends in the austenitising range.

This means one of two things at design stage:

- The line is designed so that the natural dwell matches your required soak — which may mean a longer heated zone than the minimal calculation suggests
- The line runs slower than peak capacity to give the soak you need, and your effective throughput drops accordingly

This is not a defect. It is the main reason two furnaces with identical zone lengths can have very different rated capacity.

### Transfer delay is the part people underestimate

Between leaving the austenitising zone and entering the quench, the part is in air or in gas.

That delay matters. Time at temperature before quench affects hardness and grain structure. Common guidance keeps delay short and consistent — often under roughly 10 seconds for many applications, though the correct figure depends on the material and the section.

On a continuous line the transfer is mechanical and repeatable, which is a genuine advantage over manual handling.

But it is short. **Short transfer favours parts that quench fast.** A large, heavy section with high thermal mass will not cool to the right depth before the water reaches it.

If you are quenching large sections, the quench intensity has to be matched to the mass, and often the answer is a separate, slower quench arrangement — which pushes you back toward batch.

### Where a batch furnace still wins

Continuous hardening is a poor fit for:

- **Very large or heavy sections** that need slow, controlled cooling
- **Mixed geometries** where one line would need compromise settings for every part
- **Processes requiring long, variable soak times** per part
- **Low volumes** — a continuous line sized for 20 hours a day is wasteful at 2 hours a day

There is no prize for being continuous. Choose it where the process fits it.

### Quench system selection

| Quench type | Best for | Watch for |
|---|---|---|
| Water | Fast, cheap, aggressive | Agitation, water quality, thermal shock on thin parts |
| Polymer | Tunable cooling rate across a range | Concentration control, disposal, tank sizing |
| Oil | Gentler, more uniform, lower distortion | Fire handling, oil degradation, cost |
| Gas | Clean, no liquid, controlled composition | Slower cooling, capital cost, compressor load |
| Air | Simplest | Slowest cooling, inconsistent |

For continuous lines, agitation matters more than most specifications admit. Quench severity depends on fluid movement at the part surface, and a still bath gives you a different result than an agitated one — often a significantly different one.

Ask what agitation is specified, and whether the tank is sized so the flow rate does not drop as the furnace fills.

### A sensible way to scope it

1. Define the material and the geometry range, including the largest and heaviest part
2. Establish the required hardness and microstructure, not just the hardness
3. Determine the quench severity needed for the **heaviest** part
4. Check whether the natural dwell of a continuous line matches the required soak
5. Only then decide whether continuous is the right answer

If steps 3 or 4 fail, a hybrid arrangement — continuous austenitising with batch quenching, or a car bottom furnace — often gives the best of both.

We will tell you when that is the case. A line that cannot meet your metallurgical requirement is not worth the throughput.
